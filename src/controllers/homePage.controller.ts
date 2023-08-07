import { RequestHandler } from "express";
import { scrapeHomePage } from "../parsers";

// /anime/home
const getHomePageInfo: RequestHandler<
  unknown,
  Awaited<ReturnType<typeof scrapeHomePage>>
> = async (req, res, next) => {
  try {
    const data = await scrapeHomePage();
    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getHomePageInfo;
