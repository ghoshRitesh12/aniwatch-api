import { scrapeHomePage } from "../parsers";
import { Request, Response, NextFunction, Handler } from "express";

// /anime/home
const getHomePage: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await scrapeHomePage();
    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getHomePage;
