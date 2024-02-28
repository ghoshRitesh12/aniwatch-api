import { rateLimit } from "express-rate-limit";
import { config } from "dotenv";
config();

export const ratelimit = rateLimit({
  windowMs: Number(process.env.WINDOWMS) || 30 * 60 * 1000,
  max: Number(process.env.MAX) || 70,
  legacyHeaders: true,
  standardHeaders: "draft-7",
  message: "Too many API requests, try again later",
});
