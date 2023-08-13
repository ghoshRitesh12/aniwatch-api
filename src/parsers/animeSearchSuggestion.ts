import axios, { AxiosError } from "axios";
import { load, CheerioAPI, SelectorType } from "cheerio";
import {
  SRC_HOME_URL,
  SRC_AJAX_URL,
  USER_AGENT_HEADER,
  ACCEPT_ENCODING_HEADER,
} from "../utils";

import createHttpError, { HttpError } from "http-errors";
import { ScrapedAnimeSearchSuggestion } from "../models/parsers";

// /anime/search/suggest?q=${query}
async function scrapeAnimeSearchSuggestion(
  q: string
): Promise<ScrapedAnimeSearchSuggestion | HttpError> {
  const res: ScrapedAnimeSearchSuggestion = {
    suggestions: [],
  };

  try {
    const { data } = await axios.get(
      `${SRC_AJAX_URL}/search/suggest?keyword=${encodeURIComponent(q)}`,
      {
        headers: {
          Accept: "*/*",
          Pragma: "no-cache",
          Referer: SRC_HOME_URL,
          "User-Agent": USER_AGENT_HEADER,
          "X-Requested-With": "XMLHttpRequest",
          "Accept-Encoding": ACCEPT_ENCODING_HEADER,
        },
      }
    );

    const $: CheerioAPI = load(data.html);
    const selector: SelectorType = ".nav-item:has(.film-poster)";

    if ($(selector).length < 1) return res;

    $(selector).each((_, el) => {
      const id = $(el).attr("href")?.split("?")[0].includes("javascript")
        ? null
        : $(el).attr("href")?.split("?")[0]?.slice(1);

      res.suggestions.push({
        id,
        name: $(el).find(".srp-detail .film-name")?.text()?.trim() || null,
        jname:
          $(el).find(".srp-detail .film-name")?.attr("data-jname")?.trim() ||
          $(el).find(".srp-detail .alias-name")?.text()?.trim() ||
          null,
        poster: $(el)
          .find(".film-poster .film-poster-img")
          ?.attr("data-src")
          ?.trim(),
        moreInfo: [
          ...$(el)
            .find(".film-infor")
            .contents()
            .map((_, el) => $(el).text().trim()),
        ].filter((i) => i),
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

export default scrapeAnimeSearchSuggestion;
