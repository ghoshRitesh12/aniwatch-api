import createHttpError from "http-errors";
import { type RequestHandler } from "express";
import { scrapeAnimeAboutInfo } from "../parsers/index.js";
import { type AnimeAboutInfoQueryParams } from "../types/controllers/index.js";

// /anime/info?id=${anime-id}
const getAnimeAboutInfo: RequestHandler<
  unknown,
  Awaited<ReturnType<typeof scrapeAnimeAboutInfo>>,
  unknown,
  AnimeAboutInfoQueryParams
> = async (req, res, next) => {
  try {
    const animeId = req.query.id
      ? decodeURIComponent(req.query.id as string)
      : null;

    if (animeId === null) {
      throw createHttpError.BadRequest("Anime unique id required");
    }

    const data = await scrapeAnimeAboutInfo(animeId);

    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getAnimeAboutInfo;
