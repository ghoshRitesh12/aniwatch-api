import createHttpError from "http-errors";
import { type RequestHandler } from "express";
import { scrapeAnimeSearchSuggestion } from "../parsers/index.js";
import { type AnimeSearchSuggestQueryParams } from "../types/controllers/index.js";

// /anime/search/suggest?q=${query}
const getAnimeSearchSuggestion: RequestHandler<
  unknown,
  Awaited<ReturnType<typeof scrapeAnimeSearchSuggestion>>,
  unknown,
  AnimeSearchSuggestQueryParams
> = async (req, res, next) => {
  try {
    const query: string | null = req.query.q
      ? decodeURIComponent(req.query.q as string)
      : null;

    if (query === null) {
      throw createHttpError.BadRequest("Search keyword required");
    }

    const data = await scrapeAnimeSearchSuggestion(query);

    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getAnimeSearchSuggestion;
