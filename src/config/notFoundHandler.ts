import { RequestHandler } from "express";
import createHttpError from "http-errors";

const notFoundHandler: RequestHandler = (req, res, next) => {
  return next(createHttpError.NotFound());
};

export default notFoundHandler;
