import createHttpError from "http-errors";
import { type RequestHandler } from "express";
import { scrapeProducerAnimes } from "../parsers/index.js";
import type {
  AnimeProducerPathParams,
  AnimeProducerQueryParams,
} from "../types/controllers/index.js";

// /anime/producer/${name}?page=${page}
const getProducerAnimes: RequestHandler<
  AnimeProducerPathParams,
  Awaited<ReturnType<typeof scrapeProducerAnimes>>,
  unknown,
  AnimeProducerQueryParams
> = async (req, res, next) => {
  try {
    const name: string | null = req.params.name
      ? decodeURIComponent(req.params.name as string)
      : null;

    const page: number = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;

    if (name === null) {
      throw createHttpError.BadRequest("Anime producer name required");
    }

    const data = await scrapeProducerAnimes(name, page);
    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getProducerAnimes;
