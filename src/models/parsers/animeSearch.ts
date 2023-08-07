import { HttpError } from "http-errors";
import { MostPopularAnime } from "../anime";
import { ScrapedAnimeCategory, CommonAnimeScrapeTypes } from "./animeCategory";

export interface ScrapedAnimeSearchResult
  extends Pick<ScrapedAnimeCategory, CommonAnimeScrapeTypes> {
  mostPopularAnimes: Array<MostPopularAnime> | HttpError;
}
