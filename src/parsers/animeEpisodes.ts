import {
  SRC_BASE_URL,
  SRC_AJAX_URL,
  ACCEPT_HEADER,
  USER_AGENT_HEADER,
  ACCEPT_ENCODING_HEADER,
} from "../utils";
import axios, { AxiosError } from "axios";
import createHttpError, { HttpError } from "http-errors";
import { load, CheerioAPI } from "cheerio";
import { ScrapedAnimeEpisodes } from "../models/parsers";

// /anime/episodes/${anime-id}
async function scrapeAnimeEpisodes(
  animeId: string
): Promise<ScrapedAnimeEpisodes | HttpError> {
  const res: ScrapedAnimeEpisodes = {
    totalEpisodes: 0,
    episodes: [],
  };

  try {
    const episodesAjax = await axios.get(
      `${SRC_AJAX_URL}/v2/episode/list/${animeId.split("-").pop()}`,
      {
        headers: {
          Accept: ACCEPT_HEADER,
          "User-Agent": USER_AGENT_HEADER,
          "X-Requested-With": "XMLHttpRequest",
          "Accept-Encoding": ACCEPT_ENCODING_HEADER,
          Referer: `${SRC_BASE_URL}/watch/${animeId}`,
        },
      }
    );

    const $: CheerioAPI = load(episodesAjax.data.html);

    res.totalEpisodes = Number($(".detail-infor-content .ss-list a").length);

    $(".detail-infor-content .ss-list a").each((i, el) => {
      res.episodes.push({
        title: $(el)?.attr("title")?.trim() || null,
        episodeId: $(el)?.attr("href")?.split("/")?.pop() || null,
        number: Number($(el).attr("data-number")),
        isFiller: $(el).hasClass("ssl-item-filler"),
      });
    });

    return res;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      throw createHttpError(
        err?.response?.status || 500,
        err?.response?.statusText || "Something went wrong"
      );
    }
    throw createHttpError.InternalServerError(err?.message);
  }
}

export default scrapeAnimeEpisodes;
