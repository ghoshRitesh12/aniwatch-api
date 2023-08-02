"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importDefault(require("http-errors"));
const routes_1 = __importDefault(require("./routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4000;
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.send(`
    <body style="font-family: sans-serif; background: #000; color: #FFF;">
      <h3>Welcome to Zoro.to api ⚔️</h3>
      <a 
        style="color: #00AEDD;"
        href="https://github.com/ghoshRitesh12/zoro.to-api#readme"
        rel="noopener noreferer"
      >
        Visit docs for more into
      </a>
    </body>
  `);
});
app.use("/anime", routes_1.default);
app.use((req, res, next) => next(http_errors_1.default.NotFound()));
const errorHandler = (error, req, res, next) => {
    const status = error?.status || 500;
    res.status(status).json({
        status,
        message: error?.message || "Something Went Wrong",
    });
};
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`⚔️  api @ http://localhost:${PORT}`);
});
