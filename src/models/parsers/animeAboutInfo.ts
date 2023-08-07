import { HttpError } from "http-errors";
import { ScrapedAnimeSearchResult } from "./animeSearch";
import {
  AnimeGeneralAboutInfo,
  Season,
  RelatedAnime,
  RecommendedAnime,
} from "../anime";

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
