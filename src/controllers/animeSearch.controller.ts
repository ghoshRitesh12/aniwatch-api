import createHttpError from "http-errors";
import { type RequestHandler } from "express";
import { scrapeAnimeSearch } from "../parsers/index.js";
import type {
  SearchFilters,
  AnimeSearchQueryParams,
} from "../types/controllers/index.js";

const searchFilters: Record<string, boolean> = {
  filter: true,
  type: true,
  status: true,
  rated: true,
  score: true,
  season: true,
  language: true,
  start_date: true,
  end_date: true,
  sort: true,
  genres: true,
} as const;

// /anime/search?q=${query}&page=${page}
const getAnimeSearch: RequestHandler<
  unknown,
  Awaited<ReturnType<typeof scrapeAnimeSearch>>,
  unknown,
  AnimeSearchQueryParams
> = async (req, res, next) => {
  try {
    let { q: query, page, ...filters } = req.query;

    query = query ? decodeURIComponent(query) : undefined;
    const pageNo = page ? Number(decodeURIComponent(page as string)) : 1;

    if (query === undefined) {
      throw createHttpError.BadRequest("Search keyword required");
    }

    const parsedFilters: SearchFilters = {};
    for (const key in filters) {
      if (searchFilters[key]) {
        parsedFilters[key as keyof SearchFilters] =
          filters[key as keyof SearchFilters];
      }
    }

    const data = await scrapeAnimeSearch(query, pageNo, parsedFilters);

    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getAnimeSearch;
