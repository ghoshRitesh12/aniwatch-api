import type { MiddlewareHandler } from "hono";
import { logger as honoLogger } from "hono/logger";
import { logger } from "../config/logger.js";

export const logging: MiddlewareHandler = honoLogger(
    (msg: string, ...rest: string[]) => {
        logger.info(msg, ...rest);
    }
);
