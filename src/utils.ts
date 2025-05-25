import { cache } from "./config/cache.js";
import type { ServerType } from "@hono/node-server";

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export function execGracefulShutdown(server: ServerType) {
    process.stdout.write("\naniwatch-api SHUTTING DOWN gracefully...\n");

    cache.closeConnection();
    server.close((err) => {
        process.stdout.write("\naniwatch-api SHUTDOWN complete.\n");
        err ? console.error(err) : null;
        process.exit(err ? 1 : 0);
    });
    process.exit(0);
}
