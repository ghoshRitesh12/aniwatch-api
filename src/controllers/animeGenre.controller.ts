import createHttpError from "http-errors";
import { type RequestHandler } from "express";
import { scrapeGenreAnime } from "../parsers/index.js";
import type {
  GenreAnimePathParams,
  GenreAnimeQueryParams,
} from "../types/controllers/index.js";

// /anime/genre/${name}?page=${page}
const getGenreAnime: RequestHandler<
  GenreAnimePathParams,
  Awaited<ReturnType<typeof scrapeGenreAnime>>,
  unknown,
  GenreAnimeQueryParams
> = async (req, res, next) => {
  try {
    const name: string | null = req.params.name
      ? decodeURIComponent(req.params.name as string)
      : null;

    const page: number = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;

    if (name === null) {
      throw createHttpError.BadRequest("Anime genre required");
    }

    const data = await scrapeGenreAnime(name, page);
    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getGenreAnime;
