import axios, { AxiosError } from "axios";
import createHttpError, { HttpError } from "http-errors";
import { load, CheerioAPI, SelectorType } from "cheerio";

import {
  SRC_BASE_URL,
  ACCEPT_HEADER,
  USER_AGENT_HEADER,
  ACCEPT_ENCODING_HEADER,
  extractMostPopularAnimes,
  extractAnimes,
  extractTop10Animes,
} from "../utils";
import { ScrapedProducerAnime } from "../models/parsers";

// /anime/producer/${name}?page=${page}
async function scrapeProducerAnimes(
  producerName: string,
  page: number = 1
): Promise<ScrapedProducerAnime | HttpError> {
  const res: ScrapedProducerAnime = {
    producerName,
    animes: [],
    top10Animes: {
      today: [],
      week: [],
      month: [],
    },
    topAiringAnimes: [],
    totalPages: 1,
    hasNextPage: false,
    currentPage: Number(page),
  };

  try {
    const producerUrl: URL = new URL(
      `/producer/${producerName}?page=${page}`,
      SRC_BASE_URL
    );

    const mainPage = await axios.get(producerUrl.href, {
      headers: {
        Accept: ACCEPT_HEADER,
        "User-Agent": USER_AGENT_HEADER,
        "Accept-Encoding": ACCEPT_ENCODING_HEADER,
      },
    });

    const $: CheerioAPI = load(mainPage.data);

    const animeSelector: SelectorType =
      "#main-content .tab-content .film_list-wrap .flw-item";

    res.hasNextPage =
      $(".pagination > li").length > 0
        ? $(".pagination li.active").length > 0
          ? $(".pagination > li").last().hasClass("active")
            ? false
            : true
          : false
        : false;

    res.totalPages =
      Number(
        $('.pagination > .page-item a[title="Last"]')
          ?.attr("href")
          ?.split("=")
          .pop() ??
          $('.pagination > .page-item a[title="Next"]')
            ?.attr("href")
            ?.split("=")
            .pop() ??
          $(".pagination > .page-item.active a")?.text()?.trim()
      ) || 1;

    res.animes = extractAnimes($, animeSelector);

    if (res.animes.length === 0 && !res.hasNextPage) {
      res.totalPages = 0;
    }

    const producerNameSelector: SelectorType =
      "#main-content .block_area .block_area-header .cat-heading";
    res.producerName = $(producerNameSelector)?.text()?.trim() ?? producerName;

    const top10AnimeSelector: SelectorType =
      '#main-sidebar .block_area-realtime [id^="top-viewed-"]';

    $(top10AnimeSelector).each((_, el) => {
      const period = $(el).attr("id")?.split("-")?.pop()?.trim();

      if (period === "day") {
        res.top10Animes.today = extractTop10Animes($, period);
        return;
      }
      if (period === "week") {
        res.top10Animes.week = extractTop10Animes($, period);
        return;
      }
      if (period === "month") {
        res.top10Animes.month = extractTop10Animes($, period);
      }
    });

    const topAiringSelector: SelectorType =
      "#main-sidebar .block_area_sidebar:nth-child(2) .block_area-content .anif-block-ul ul li";
    res.topAiringAnimes = extractMostPopularAnimes($, topAiringSelector);

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

export default scrapeProducerAnimes;
