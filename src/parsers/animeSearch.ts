import axios, { AxiosError } from "axios";
import { load, CheerioAPI, SelectorType } from "cheerio";
import {
  SRC_SEARCH_URL,
  ACCEPT_HEADER,
  USER_AGENT_HEADER,
  ACCEPT_ENCODING_HEADER,
  extractMostPopularAnimes,
  extractTop10Animes,
  extractAnimes,
} from "../utils";

import createHttpError, { HttpError } from "http-errors";
import { AnimeSearchResult } from "../models";

// /anime/search?q=${query}&page=${page}
async function scrapeAnimeSearch(
  q: string,
  page: number = 1
): Promise<AnimeSearchResult | HttpError> {
  const res: AnimeSearchResult = {
    animes: [],
    mostPopularAnimes: [],
    currentPage: Number(page),
    hasNextPage: false,
    totalPages: 0,
  };

  try {
    const mainPage = await axios.get(
      `${SRC_SEARCH_URL}?keyword=${q}&page=${page}`,
      {
        headers: {
          "User-Agent": USER_AGENT_HEADER,
          "Accept-Encoding": ACCEPT_ENCODING_HEADER,
          Accept: ACCEPT_HEADER,
        },
      }
    );

    const $: CheerioAPI = load(mainPage.data);

    const selector: SelectorType =
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
      parseInt(
        $('.pagination > .page-item a[title="Last"]')
          ?.attr("href")
          ?.split("=")
          .pop() ??
          $('.pagination > .page-item a[title="Next"]')
            ?.attr("href")
            ?.split("=")
            .pop() ??
          $(".pagination > .page-item.active a")?.text()?.trim()
      ) || 0;

    if (res.totalPages === 0 && !res.hasNextPage) {
      res.totalPages = 0;
    }

    res.animes = extractAnimes($, selector);

    if (res.animes.length === 0) {
      res.totalPages = 0;
      res.hasNextPage = false;
    }

    const mostPopularSelector: SelectorType =
      "#main-sidebar .block_area.block_area_sidebar.block_area-realtime .anif-block-ul ul li";
    res.mostPopularAnimes = extractMostPopularAnimes($, mostPopularSelector);

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

export default scrapeAnimeSearch;