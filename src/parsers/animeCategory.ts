import axios, { AxiosError } from "axios";
import { load, CheerioAPI, SelectorType } from "cheerio";
import {
  SRC_BASE_URL,
  ACCEPT_HEADER,
  USER_AGENT_HEADER,
  ACCEPT_ENCODING_HEADER,
  extractAnimes,
  extractTop10Animes,
} from "../utils";

import { AnimeCategories } from "../models/anime";
import createHttpError, { HttpError } from "http-errors";
import { ScrapedAnimeCategory } from "../models/parsers";

// /anime/:category?page=${page}
async function scrapeAnimeCategory(
  category: AnimeCategories,
  page: number = 1
): Promise<ScrapedAnimeCategory | HttpError> {
  const res: ScrapedAnimeCategory = {
    animes: [],
    genres: [],
    top10Animes: {
      today: [],
      week: [],
      month: [],
    },
    category,
    currentPage: Number(page),
    hasNextPage: false,
    totalPages: 1,
  };

  try {
    const scrapeUrl: URL = new URL(category, SRC_BASE_URL);
    const mainPage = await axios.get(`${scrapeUrl}?page=${page}`, {
      headers: {
        "User-Agent": USER_AGENT_HEADER,
        "Accept-Encoding": ACCEPT_ENCODING_HEADER,
        Accept: ACCEPT_HEADER,
      },
    });

    const $: CheerioAPI = load(mainPage.data);

    const selector: SelectorType =
      "#main-content .tab-content .film_list-wrap .flw-item";

    const categoryNameSelector: SelectorType =
      "#main-content .block_area .block_area-header .cat-heading";
    res.category = $(categoryNameSelector)?.text()?.trim() ?? category;

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

    res.animes = extractAnimes($, selector);

    if (res.animes.length === 0 && !res.hasNextPage) {
      res.totalPages = 0;
    }

    const genreSelector: SelectorType =
      "#main-sidebar .block_area.block_area_sidebar.block_area-genres .sb-genre-list li";
    $(genreSelector).each((i, el) => {
      res.genres.push(`${$(el).text().trim()}`);
    });

    const top10AnimeSelector: SelectorType =
      '#main-sidebar .block_area-realtime [id^="top-viewed-"]';

    $(top10AnimeSelector).each((i, el) => {
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

export default scrapeAnimeCategory;
