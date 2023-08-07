import { HttpError } from "http-errors";
import { Anime, Top10Anime, AnimeCategories } from "../anime";

export interface ScrapedAnimeCategory {
  animes: Array<Anime> | HttpError;
  genres: Array<string>;
  top10Animes: {
    today: Array<Top10Anime> | HttpError;
    week: Array<Top10Anime> | HttpError;
    month: Array<Top10Anime> | HttpError;
  };
  category: AnimeCategories;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}

export type CommonAnimeScrapeTypes =
  | "animes"
  | "totalPages"
  | "hasNextPage"
  | "currentPage";
