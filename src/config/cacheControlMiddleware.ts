import type { MiddlewareHandler } from "hono";

// Define middleware to add Cache-Control header
const cacheControlMiddleware: MiddlewareHandler = async (c, next) => {
  const sMaxAge = process.env.ANIWATCH_API_S_MAXAGE || "60";
  const staleWhileRevalidate = process.env.ANIWATCH_API_STALE_WHILE_REVALIDATE || "30";
  c.header(
    "Cache-Control",
    `s-maxage=${sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`
  );

  await next();
};

export default cacheControlMiddleware;
