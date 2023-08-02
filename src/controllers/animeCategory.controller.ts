import { scrapeAnimeCategory } from "../parsers";
import createHttpError from "http-errors";
import { AnimeCategories } from "../models";
import { Request, Response, NextFunction, Handler } from "express";

// /anime/:category?page=${page}
const getAnimeCategory: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category: AnimeCategories = decodeURIComponent(
      req.params.category
    ) as AnimeCategories;

    const page: number = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;

    if (!category) throw createHttpError.BadRequest("category required");

    const data = await scrapeAnimeCategory(category, page);

    res.status(200).json(data);
  } catch (err: any) {
    // console.error(err);
    next(err);
  }
};

export default getAnimeCategory;
