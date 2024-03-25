import type {
  ScrapedAnimeCategory,
  CommonAnimeScrapeTypes,
} from "./animeCategory.js";
import type { HttpError } from "http-errors";
import type { MostPopularAnime } from "../anime.js";
import type { SearchFilters } from "../controllers/animeSearch.js";

export interface ScrapedAnimeSearchResult
  extends Pick<ScrapedAnimeCategory, CommonAnimeScrapeTypes> {
  mostPopularAnimes: Array<MostPopularAnime> | HttpError;
  searchQuery: string;
  searchFilters: SearchFilters;
}
