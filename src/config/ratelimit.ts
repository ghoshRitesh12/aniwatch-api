import { config } from "dotenv";
import createHttpError from "http-errors";
import { rateLimit } from "express-rate-limit";

config();

export const ratelimit = rateLimit({
  windowMs: Number(process.env.WINDOWMS) || 30 * 60 * 1000,
  limit: Number(process.env.MAX) || 50,
  legacyHeaders: true,
  standardHeaders: "draft-7",
  handler: function (_, __, next) {
    next(
      createHttpError.TooManyRequests("Too many API requests, try again later")
    );
  },
});
