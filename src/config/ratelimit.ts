import { rateLimit } from "express-rate-limit";

export const ratelimit = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 70,
  legacyHeaders: true,
  standardHeaders: "draft-7",
  message: "Too many API requests, try again later",
});
