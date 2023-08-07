import { ScrapedHomePage } from "./homePage";
import { ScrapedAnimeCategory, CommonAnimeScrapeTypes } from "./animeCategory";

export interface ScrapedGenreAnime
  extends Pick<ScrapedAnimeCategory, CommonAnimeScrapeTypes | "genres">,
    Pick<ScrapedHomePage, "topAiringAnimes"> {
  genreName: string;
}
