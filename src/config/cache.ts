import { Redis } from "ioredis";
import { env } from "./env.js";

export class AniwatchAPICache {
    private static instance: AniwatchAPICache | null = null;

    private client: Redis | null;
    public enabled: boolean = false;

    static enabled = false;
    // 5 mins, 5 * 60
    static DEFAULT_CACHE_EXPIRY_SECONDS = 300 as const;
    static CACHE_EXPIRY_HEADER_NAME = "Aniwatch-Cache-Expiry" as const;

    constructor() {
        const redisConnURL = env.ANIWATCH_API_REDIS_CONN_URL;
        this.enabled = AniwatchAPICache.enabled = Boolean(redisConnURL);
        this.client = this.enabled ? new Redis(String(redisConnURL)) : null;
    }

    static getInstance() {
        if (!AniwatchAPICache.instance) {
            AniwatchAPICache.instance = new AniwatchAPICache();
        }
        return AniwatchAPICache.instance;
    }

    /**
     * @param expirySeconds set to 300 (5 mins) by default
     */
    async getOrSet<T>(
        dataGetter: () => Promise<T>,
        key: string,
        expirySeconds: number = AniwatchAPICache.DEFAULT_CACHE_EXPIRY_SECONDS
    ) {
        const cachedData = this.enabled
            ? (await this.client?.get?.(key)) || null
            : null;
        let data = JSON.parse(String(cachedData)) as T;

        if (!data) {
            data = await dataGetter();
            await this.client?.set?.(
                key,
                JSON.stringify(data),
                "EX",
                expirySeconds
            );
        }
        return data;
    }

    closeConnection() {
        this.client
            ?.quit()
            ?.then(() => {
                this.client = null;
                AniwatchAPICache.instance = null;
                console.info(
                    "aniwatch-api redis connection closed and cache instance reset"
                );
            })
            .catch((err) => {
                console.error(
                    `aniwatch-api error while closing redis connection: ${err}`
                );
            });
    }
}

export const cache = AniwatchAPICache.getInstance();
