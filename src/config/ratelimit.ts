import { rateLimiter } from "hono-rate-limiter";
import { getConnInfo as vercelGetConnInfo } from "hono/vercel";
import { getConnInfo as cfWorkersGetConnInfo } from "hono/cloudflare-workers";
import { getConnInfo as nodejsGetConnInfo } from "@hono/node-server/conninfo";
import type { GetConnInfo } from "hono/conninfo";
import { DeploymentEnv, env } from "./env.js";

let getConnInfo: GetConnInfo;
switch (env.ANIWATCH_API_DEPLOYMENT_ENV) {
    case DeploymentEnv.VERCEL:
        getConnInfo = vercelGetConnInfo;
        break;
    case DeploymentEnv.CLOUDFLARE_WORKERS:
        getConnInfo = cfWorkersGetConnInfo;
        break;
    default:
        getConnInfo = nodejsGetConnInfo;
}

export const ratelimit = rateLimiter({
    standardHeaders: "draft-7",
    limit: env.ANIWATCH_API_MAX_REQS,
    windowMs: env.ANIWATCH_API_WINDOW_MS,

    keyGenerator(c) {
        const { remote } = getConnInfo(c);
        const key =
            `${String(remote.addressType)}_` +
            `${String(remote.address)}:${String(remote.port)}`;

        return key;
    },
    handler(c) {
        return c.json(
            { status: 429, message: "Too Many Requests 😵" },
            { status: 429 }
        );
    },
});
