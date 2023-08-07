import morgan from "morgan";
import env from "./config/env";
import express, { Application } from "express";

import animeRouter from "./routes";
import { homePage } from "./controllers";
import errorHandler from "./config/errorHandler";
import notFoundHandler from "./config/notFoundHandler";

const app: Application = express();
const PORT: number = env.PORT || 4000;

app.use(morgan("dev"));

app.get("/", homePage);
app.use("/anime", animeRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚔️  api @ http://localhost:${PORT}`);
});
