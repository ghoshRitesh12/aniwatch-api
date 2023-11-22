import type {
  ScrapedAnimeCategory,
  CommonAnimeScrapeTypes,
} from "./animeCategory.js";
import type { HttpError } from "http-errors";
import type { MostPopularAnime } from "../anime.js";

export interface ScrapedAnimeSearchResult
  extends Pick<ScrapedAnimeCategory, CommonAnimeScrapeTypes> {
  mostPopularAnimes: Array<MostPopularAnime> | HttpError;
}
