import { HiAnimeError } from "aniwatch";
import type { ErrorHandler, NotFoundHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { log } from "./logger.js";

const errResp: { status: ContentfulStatusCode; message: string } = {
    status: 500,
    message: "Internal Server Error",
};

export const errorHandler: ErrorHandler = (err, c) => {
    log.error(JSON.stringify(err));

    if (err instanceof HiAnimeError) {
        errResp.status = err.status as ContentfulStatusCode;
        errResp.message = err.message;
        
        // Add more specific error handling for common issues
        if (err.message.includes("fetchError")) {
            log.error("Network/Fetch error detected. This might be due to:");
            log.error("- Website blocking requests from this IP/region");
            log.error("- Network connectivity issues");
            log.error("- Rate limiting from the target website");
            log.error("- Changes in the website structure");
            
            // Provide a more helpful error message
            errResp.message = "Service temporarily unavailable. The target website may be blocking requests or experiencing issues.";
        }
    } else {
        // Handle other types of errors
        log.error(`Unexpected error type: ${err.constructor.name}`);
        log.error(`Error details: ${err.message}`);
        
        // Check if it's a network-related error
        if (err.message?.includes("ENOTFOUND") || err.message?.includes("ECONNREFUSED")) {
            errResp.message = "Network connectivity issue. Unable to reach the target website.";
        } else if (err.message?.includes("timeout")) {
            errResp.message = "Request timeout. The target website is taking too long to respond.";
        }
    }

    return c.json(errResp, errResp.status);
};

export const notFoundHandler: NotFoundHandler = (c) => {
    errResp.status = 404;
    errResp.message = "Not Found";

    log.error(JSON.stringify(errResp));
    return c.json(errResp, errResp.status);
};
