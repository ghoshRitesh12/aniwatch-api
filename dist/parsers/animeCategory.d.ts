import { HttpError } from "http-errors";
import { ScrapedAnimeCategory, AnimeCategories } from "../models";
declare function scrapeAnimeCategory(category: AnimeCategories, page?: number): Promise<ScrapedAnimeCategory | HttpError>;
export default scrapeAnimeCategory;
