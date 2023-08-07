import createHttpError from "http-errors";
import { RequestHandler } from "express";
import { AnimeCategories } from "../models/anime";
import { scrapeAnimeCategory } from "../parsers";
import {
  CategoryAnimePathParams,
  CategoryAnimeQueryParams,
} from "../models/controllers";

// /anime/:category?page=${page}
const getAnimeCategory: RequestHandler<
  CategoryAnimePathParams,
  Awaited<ReturnType<typeof scrapeAnimeCategory>>,
  unknown,
  CategoryAnimeQueryParams
> = async (req, res, next) => {
  try {
    const category = req.params.category
      ? decodeURIComponent(req.params.category)
      : null;

    const page: number = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;

    if (category === null) {
      throw createHttpError.BadRequest("category required");
    }

    const data = await scrapeAnimeCategory(category as AnimeCategories, page);

    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getAnimeCategory;
