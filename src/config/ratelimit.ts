import { config } from "dotenv";
import { rateLimiter } from "hono-rate-limiter";
import { getConnInfo } from "@hono/node-server/conninfo";

config();

export const ratelimit = rateLimiter({
  windowMs: Number(process.env.ANIWATCH_API_WINDOW_MS) || 30 * 60 * 1000,
  limit: Number(process.env.ANIWATCH_API_MAX_REQS) || 6,
  standardHeaders: "draft-7",
  keyGenerator(c) {
    const { remote } = getConnInfo(c);
    const key =
      `${String(remote.addressType)}_` +
      `${String(remote.address)}:${String(remote.port)}`;

    return key;
  },
  handler: (c) =>
    c.json({ status: 429, message: "Too Many Requests 😵" }, { status: 429 }),
});
