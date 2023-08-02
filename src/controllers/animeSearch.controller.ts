import { scrapeAnimeSearch } from "../parsers";
import createHttpError from "http-errors";
import { AnimeCategories } from "../models";
import { Request, Response, NextFunction, Handler } from "express";

// /anime/search?q=${query}&page=${page}
const getAnimeSearch: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const q: string | null = req.query.q
      ? decodeURIComponent(req.query.q as string)
      : null;
    const page: number = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;

    if (q === null) {
      throw createHttpError.BadGateway("Search keyword required");
    }

    const data = await scrapeAnimeSearch(q, page);

    res.status(200).json(data);
  } catch (err: any) {
    // console.error(err);
    next(err);
  }
};

export default getAnimeSearch;
