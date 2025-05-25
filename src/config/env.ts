import { config } from "dotenv";
import { cleanEnv, num, str, url, port } from "envalid";

config();

export enum DeploymentEnv {
    NODEJS = "nodejs",
    DOCKER = "docker",
    VERCEL = "vercel",
    CLOUDFLARE_WORKERS = "cloudflare-workers",
    RENDER = "render",
}
export const API_DEPLOYMENT_ENVIRONMENTS = Object.values(DeploymentEnv);
export const SERVERLESS_ENVIRONMENTS = [
    DeploymentEnv.VERCEL,
    DeploymentEnv.CLOUDFLARE_WORKERS,
    DeploymentEnv.RENDER,
];

//
export const env = cleanEnv(process.env, {
    ANIWATCH_API_PORT: port({
        default: 4000,
        desc: "Port number of the Aniwatch API.",
    }),

    ANIWATCH_API_WINDOW_MS: num({
        // 60 mins if dev, else 30 mins
        default: isDevEnv() ? 60 * 60 * 1000 : 30 * 60 * 1000,
        desc: "Duration to track requests for rate limiting (in milliseconds).",
        docs: "https://github.com/ghoshRitesh12/aniwatch-api/blob/main/.env.example#L9",
    }),

    ANIWATCH_API_MAX_REQS: num({
        default: isDevEnv() ? 600 : 6,
        desc: "Maximum number of requests in the `ANIWATCH_API_WINDOW_MS` time period.",
    }),

    ANIWATCH_API_CORS_ALLOWED_ORIGINS: str({
        default: undefined,
        example:
            "https://your-production-domain.com,https://another-trusted-domain.com",
        desc: "Allowed origins, separated by commas and no spaces in between (CSV).",
    }),

    ANIWATCH_API_DEPLOYMENT_ENV: str({
        choices: API_DEPLOYMENT_ENVIRONMENTS,
        default: DeploymentEnv.NODEJS,
        example: DeploymentEnv.VERCEL,
        desc: "The deployment environment of the Aniwatch API. It must be set incase of serverless deployments, otherwise you may run into weird issues.",
        docs: "https://github.com/ghoshRitesh12/aniwatch-api/blob/main/.env.example#L21",
    }),

    ANIWATCH_API_HOSTNAME: str({
        default: undefined,
        example: "your-production-domain.com",
        desc: "Set this to your api instance's hostname to enable rate limiting, don't have this value if you don't wish to rate limit.",
        docs: "https://github.com/ghoshRitesh12/aniwatch-api/blob/main/.env.example#L18",
    }),

    ANIWATCH_API_REDIS_CONN_URL: url({
        default: undefined,
        example:
            "rediss://default:your-secure-password@your-redis-instance-name.provider.com:6379",
        desc: "This env is optional by default and can be set to utilize Redis caching functionality. It has to be a valid connection URL; otherwise, the Redis client can throw unexpected errors",
    }),

    ANIWATCH_API_S_MAXAGE: num({
        default: 60,
        desc: "Specifies the maximum amount of time (in seconds) a resource is considered fresh when served by a CDN cache.",
    }),

    ANIWATCH_API_STALE_WHILE_REVALIDATE: num({
        default: 30,
        desc: "Specifies the amount of time (in seconds) a resource is served stale while a new one is fetched.",
    }),

    NODE_ENV: str({
        default: "development",
        choices: ["development", "production", "test", "staging"],
        desc: "The environment in which the application is running.",
        docs: "https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production",
    }),
});

function isDevEnv(): boolean {
    return (
        !process.env.NODE_ENV ||
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
    );
}
