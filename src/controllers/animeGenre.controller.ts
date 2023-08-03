import { scrapeGenreAnime } from "../parsers";
import createHttpError from "http-errors";
import { Request, Response, NextFunction, Handler } from "express";

// /anime/genre/:${genreName}?page=${page}
const getGenreAnime: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
