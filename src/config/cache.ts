import { config } from "dotenv";
import { Redis } from "ioredis";

config();

export class AniwatchAPICache {
  private _client: Redis | null;
  public isOptional: boolean = true;

  static DEFAULT_CACHE_EXPIRY_SECONDS = 60 as const;
  static CACHE_EXPIRY_HEADER_NAME = "X-ANIWATCH-CACHE-EXPIRY" as const;

  constructor() {
    const redisConnURL = process.env?.ANIWATCH_API_REDIS_CONN_URL;
    this.isOptional = !Boolean(redisConnURL);
    this._client = this.isOptional ? null : new Redis(String(redisConnURL));
  }

  set(key: string | Buffer, value: string | Buffer | number) {
    if (this.isOptional) return;
    return this._client?.set(key, value);
  }

  get(key: string | Buffer) {
    if (this.isOptional) return;
    return this._client?.get(key);
  }

  /**
   * @param expirySeconds set to 60 by default
   */
  async getOrSet<T>(
    setCB: () => Promise<T>,
    key: string | Buffer,
    expirySeconds: number = AniwatchAPICache.DEFAULT_CACHE_EXPIRY_SECONDS
  ) {
    const cachedData = this.isOptional
      ? null
      : (await this._client?.get(key)) || null;
    let data = JSON.parse(String(cachedData)) as T;

    if (!data) {
      data = await setCB();
      await this._client?.set(key, JSON.stringify(data), "EX", expirySeconds);
    }
    return data;
  }
}

export const cache = new AniwatchAPICache();
