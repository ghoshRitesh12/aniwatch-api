import type { Prettify } from "../utils.js";

type ServerContextVariables = Prettify<{
    CACHE_CONFIG: {
        key: string;
        duration: number;
    };
}>;

export type ServerContext = Prettify<{
    Variables: ServerContextVariables;
}>;
