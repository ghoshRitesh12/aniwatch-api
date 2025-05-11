import { Redis } from "ioredis";
import { env } from "./env.js";

export class AniwatchAPICache {
    private static instance: AniwatchAPICache | null = null;

    private client: Redis | null;
    public isOptional: boolean = true;

    static DEFAULT_CACHE_EXPIRY_SECONDS = 60 as const;
    static CACHE_EXPIRY_HEADER_NAME = "X-ANIWATCH-CACHE-EXPIRY" as const;

    constructor() {
        const redisConnURL = env.ANIWATCH_API_REDIS_CONN_URL;
        this.isOptional = !Boolean(redisConnURL);
        this.client = this.isOptional ? null : new Redis(String(redisConnURL));
    }

    static getInstance() {
        if (!AniwatchAPICache.instance) {
            AniwatchAPICache.instance = new AniwatchAPICache();
        }
        return AniwatchAPICache.instance;
    }

    // set(key: string | Buffer, value: string | Buffer | number) {
    //     if (this.isOptional) return;
    //     return this.client?.set(key, value);
    // }

    // get(key: string | Buffer) {
    //     if (this.isOptional) return;
    //     return this.client?.get(key);
    // }

    /**
     * @param expirySeconds set to 60 by default
     */
    async getOrSet<T>(
        dataGetter: () => Promise<T>,
        key: string | Buffer,
        expirySeconds: number = AniwatchAPICache.DEFAULT_CACHE_EXPIRY_SECONDS
    ) {
        const cachedData = this.isOptional
            ? null
            : (await this.client?.get?.(key)) || null;
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
}

export const cache = AniwatchAPICache.getInstance();
