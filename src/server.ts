import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Application,
} from "express";
import { config } from "dotenv";
import morgan from "morgan";
import createHttpError from "http-errors";

config();
const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4000;

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.json("hi there");
});

app.use((req: Request, res: Response, next: NextFunction) =>
  next(createHttpError.NotFound())
);

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error?.status || 500;
  res.status(status).json({
    status,
    message: error?.message || "Something Went Wrong",
  });
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚔ api @ http://localhost:${PORT}`);
});
