import type { ScrapedHomePage } from "./homePage.js";
import type { ScrapedAnimeCategory } from "./animeCategory.js";

export interface ScrapedProducerAnime
  extends Omit<ScrapedAnimeCategory, "genres" | "category">,
    Pick<ScrapedHomePage, "topAiringAnimes"> {
  producerName: string;
}
