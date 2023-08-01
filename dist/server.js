import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import createHttpError from "http-errors";
config();
const app = express();
const PORT = Number(process.env.PORT) || 4000;
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.json("hi there");
});
app.use((req, res, next) => next(createHttpError.NotFound()));
const errorHandler = (error, req, res, next) => {
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
