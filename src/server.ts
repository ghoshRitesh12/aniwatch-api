import morgan from "morgan";
import express from "express";
import { config } from "dotenv";

import http from "http";
import { resolve } from "path";
import { ratelimit } from "./config/ratelimit";
import errorHandler from "./config/errorHandler";
import notFoundHandler from "./config/notFoundHandler";

import animeRouter from "./routes";

config();
const app: express.Application = express();
const PORT: number = Number(process.env.PORT) || 4000;

app.use(morgan("dev"));
app.use(ratelimit);

app.use(express.static(resolve(__dirname, "..", "public")));
app.get("/health", (_, res) => res.sendStatus(200));
app.use("/anime", animeRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚔️  api @ http://localhost:${PORT}`);
});

// don't sleep
setInterval(() => {
  console.log("HEALTHCHECK ;)", new Date().toLocaleString());
  http.get("https://api-aniwatch.onrender.com/health");
}, 540000);
