import createHttpError from "http-errors";
import { RequestHandler } from "express";
import { scrapeAnimeSearch } from "../parsers";
import { AnimeSearchQueryParams } from "../models/controllers";

// /anime/search?q=${query}&page=${page}
const getAnimeSearch: RequestHandler<
  unknown,
  Awaited<ReturnType<typeof scrapeAnimeSearch>>,
  unknown,
  AnimeSearchQueryParams
> = async (req, res, next) => {
  try {
    const query: string | null = req.query.q
      ? decodeURIComponent(req.query.q as string)
      : null;
    const page: number = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;

    if (query === null) {
      throw createHttpError.BadRequest("Search keyword required");
    }

    const data = await scrapeAnimeSearch(query, page);

    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getAnimeSearch;
