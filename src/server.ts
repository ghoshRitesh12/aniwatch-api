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
app.use(ratelimit);

app.use(express.static(resolve("public")));
app.get("/health", (_, res) => res.sendStatus(200));
app.use("/anime", animeRouter);

app.use(notFoundHandler);
app.use(errorHandler);

if (!Boolean(process?.env?.IS_VERCEL_DEPLOYMENT)) {
  app.listen(PORT, () => {
    console.log(`⚔️  api @ http://localhost:${PORT}`);
  });

  // don't sleep
  // remove the setInterval below for personal deployments
  const intervalTime = 9 * 60 * 1000; // 9mins
  setInterval(() => {
    console.log("HEALTHCHECK ;)", new Date().toLocaleString());
    https.get("https://api-aniwatch.onrender.com/health");
  }, intervalTime);
}

export default app;
