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
    
    // Retry configuration
    private static MAX_RETRIES = 3;
    private static RETRY_DELAY = 1000; // 1 second

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
     * Retry wrapper for async operations
     */
    private async withRetry<T>(operation: () => Promise<T>): Promise<T> {
        let lastError: Error;
        
        for (let attempt = 1; attempt <= AniwatchAPICache.MAX_RETRIES; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error as Error;
                
                // Don't retry on certain error types
                if (error instanceof Error && 
                    (error.message.includes("ENOTFOUND") || 
                     error.message.includes("ECONNREFUSED") ||
                     error.message.includes("fetchError"))) {
                    throw error;
                }
                
                if (attempt < AniwatchAPICache.MAX_RETRIES) {
                    console.warn(`Attempt ${attempt} failed, retrying in ${AniwatchAPICache.RETRY_DELAY}ms...`);
                    await new Promise(resolve => setTimeout(resolve, AniwatchAPICache.RETRY_DELAY));
                    // Exponential backoff
                    AniwatchAPICache.RETRY_DELAY *= 2;
                }
            }
        }
        
        throw lastError!;
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
            // Use retry logic for data fetching
            data = await this.withRetry(async () => {
                const result = await dataGetter();
                // Only cache successful results
                if (this.enabled && result) {
                    await this.client?.set?.(
                        key,
                        JSON.stringify(result),
                        "EX",
                        expirySeconds
                    );
                }
                return result;
            });
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
