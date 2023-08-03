import { scrapeAnimeAboutInfo } from "../parsers";
import createHttpError from "http-errors";
import { Request, Response, NextFunction, Handler } from "express";

// /anime/info?id=${anime-id}
const getAnimeAboutInfo: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id ? decodeURIComponent(req.query.id as string) : null;
    if (id === null)
      throw createHttpError.BadRequest("Anime unique id required");

    const data = await scrapeAnimeAboutInfo(id);

    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getAnimeAboutInfo;
