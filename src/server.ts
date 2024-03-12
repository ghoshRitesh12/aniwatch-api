import https from "https";
import morgan from "morgan";
import express from "express";
import { resolve } from "path";
import { config } from "dotenv";

import corsConfig from "./config/cors.js";
import { ratelimit } from "./config/ratelimit.js";
import errorHandler from "./config/errorHandler.js";
import notFoundHandler from "./config/notFoundHandler.js";

import animeRouter from "./routes/index.js";

config();
const app: express.Application = express();
const PORT: number = Number(process.env.PORT) || 4000;

app.use(morgan("dev"));
app.use(corsConfig);

// CAUTION: For personal deployments, "refrain" from having an env
// named "ANIWATCH_API_HOSTNAME". You may face rate limitting
// and other issues if you do.
const ISNT_PERSONAL_DEPLOYMENT = Boolean(process?.env?.ANIWATCH_API_HOSTNAME);
if (ISNT_PERSONAL_DEPLOYMENT) {
  app.use(ratelimit);
}

app.use(express.static(resolve("public")));
app.get("/health", (_, res) => res.sendStatus(200));
app.use("/anime", animeRouter);

app.use(notFoundHandler);
app.use(errorHandler);

// NOTE: this env is "required" for vercel deployments
if (!Boolean(process?.env?.IS_VERCEL_DEPLOYMENT)) {
  app.listen(PORT, () => {
    console.log(`⚔️  api @ http://localhost:${PORT}`);
  });

  // NOTE: remove the `if` block below for personal deployments
  if (ISNT_PERSONAL_DEPLOYMENT) {
    // don't sleep
    const intervalTime = 9 * 60 * 1000; // 9mins
    setInterval(() => {
      console.log("HEALTHCHECK ;)", new Date().toLocaleString());
      https
        .get(
          new URL("/health", `https://${process.env.ANIWATCH_API_HOSTNAME}`)
            .href
        )
        .on("error", (err) => {
          console.error(err.message);
        });
    }, intervalTime);
  }
}

export default app;
