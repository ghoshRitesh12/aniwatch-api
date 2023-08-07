import { rateLimit } from "express-rate-limit";

export const ratelimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  legacyHeaders: false,
  standardHeaders: true,
  message: "Too many API requests, try again later",
});
