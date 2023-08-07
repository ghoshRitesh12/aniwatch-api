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
} from "../utils";
import { ScrapedGenreAnime } from "../models/parsers";

// /anime/genre/${name}?page=${page}
async function scrapeGenreAnime(
  genreName: string,
  page: number = 1
): Promise<ScrapedGenreAnime | HttpError> {
  const res: ScrapedGenreAnime = {
    genreName,
    animes: [],
    genres: [],
    topAiringAnimes: [],
    totalPages: 1,
    hasNextPage: false,
    currentPage: Number(page),
  };

  // there's a typo with zoro where martial arts is marial arts
  genreName = genreName === "martial-arts" ? "marial-arts" : genreName;

  try {
    const genreUrl: URL = new URL(
      `/genre/${genreName}?page=${page}`,
      SRC_BASE_URL
    );

    const mainPage = await axios.get(genreUrl.href, {
      headers: {
        "User-Agent": USER_AGENT_HEADER,
        "Accept-Encoding": ACCEPT_ENCODING_HEADER,
        Accept: ACCEPT_HEADER,
      },
    });

    const $: CheerioAPI = load(mainPage.data);

    const selector: SelectorType =
      "#main-content .tab-content .film_list-wrap .flw-item";

    const genreNameSelector: SelectorType =
      "#main-content .block_area .block_area-header .cat-heading";
    res.genreName = $(genreNameSelector)?.text()?.trim() ?? genreName;

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

    const topAiringSelector: SelectorType =
      "#main-sidebar .block_area.block_area_sidebar.block_area-realtime .anif-block-ul ul li";
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

export default scrapeGenreAnime;
