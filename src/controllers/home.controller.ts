import { resolve } from "path";
import { RequestHandler } from "express";

const homePage: RequestHandler = (req, res) => {
  res.sendFile(resolve(__dirname, "..", "..", "public/index.html"));
};

export default homePage;
