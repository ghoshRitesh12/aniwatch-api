import {
  SRC_SEARCH_URL,
  ACCEPT_HEADER,
  USER_AGENT_HEADER,
  ACCEPT_ENCODING_HEADER,
  extractAnimes,
  getSearchFilterValue,
  extractMostPopularAnimes,
  getSearchDateFilterValue,
} from "../utils/index.js";
import axios, { AxiosError } from "axios";
import createHttpError, { type HttpError } from "http-errors";
import { load, type CheerioAPI, type SelectorType } from "cheerio";
import type { ScrapedAnimeSearchResult } from "../types/parsers/index.js";
import type { SearchFilters, FilterKeys } from "../types/controllers/index.js";

// /anime/search?q=${query}&page=${page}
async function scrapeAnimeSearch(
  q: string,
  page: number = 1,
  filters: SearchFilters
): Promise<ScrapedAnimeSearchResult | HttpError> {
  const res: ScrapedAnimeSearchResult = {
    animes: [],
    mostPopularAnimes: [],
    currentPage: Number(page),
    hasNextPage: false,
    totalPages: 1,
    searchQuery: q,
    searchFilters: filters,
  };

  try {
    const url = new URL(SRC_SEARCH_URL);
    url.searchParams.set("keyword", q);
    url.searchParams.set("page", `${page}`);
    url.searchParams.set("sort", "default");

    for (const key in filters) {
      if (key.includes("_date")) {
        const dates = getSearchDateFilterValue(
          key === "start_date",
          filters[key as keyof SearchFilters] || ""
        );
        if (!dates) continue;

        dates.map((dateParam) => {
          const [key, val] = dateParam.split("=");
          url.searchParams.set(key, val);
        });
        continue;
      }

      const filterVal = getSearchFilterValue(
        key as FilterKeys,
        filters[key as keyof SearchFilters] || ""
      );
      filterVal && url.searchParams.set(key, filterVal);
    }

    const mainPage = await axios.get(url.href, {
      headers: {
        "User-Agent": USER_AGENT_HEADER,
        "Accept-Encoding": ACCEPT_ENCODING_HEADER,
        Accept: ACCEPT_HEADER,
      },
    });

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
