import type {
  Season,
  RelatedAnime,
  RecommendedAnime,
  AnimeGeneralAboutInfo,
} from "../anime.js";
import { type HttpError } from "http-errors";
import { type ScrapedAnimeSearchResult } from "./animeSearch.js";

export interface ScrapedAnimeAboutInfo
  extends Pick<ScrapedAnimeSearchResult, "mostPopularAnimes"> {
  anime: {
    info: AnimeGeneralAboutInfo;
    moreInfo: Record<string, string | string[]>;
  };
  seasons: Array<Season>;
  relatedAnimes: Array<RelatedAnime> | HttpError;
  recommendedAnimes: Array<RecommendedAnime> | HttpError;
}
