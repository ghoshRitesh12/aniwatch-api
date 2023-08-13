import { ScrapedHomePage } from "./homePage";
import { ScrapedAnimeCategory } from "./animeCategory";

export interface ScrapedProducerAnime
  extends Omit<ScrapedAnimeCategory, "genres" | "category">,
    Pick<ScrapedHomePage, "topAiringAnimes"> {
  producerName: string;
}
