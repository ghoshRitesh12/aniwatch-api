import { rateLimiter } from "hono-rate-limiter";
import { getConnInfo } from "@hono/node-server/conninfo";
import { env } from "./env.js";

export const ratelimit = rateLimiter({
    windowMs: env.ANIWATCH_API_WINDOW_MS,
    limit: env.ANIWATCH_API_MAX_REQS,
    standardHeaders: "draft-7",
    keyGenerator(c) {
        const { remote } = getConnInfo(c);
        const key =
            `${String(remote.addressType)}_` +
            `${String(remote.address)}:${String(remote.port)}`;

        return key;
    },
    handler: (c) =>
        c.json(
            { status: 429, message: "Too Many Requests 😵" },
            { status: 429 }
        ),
});
