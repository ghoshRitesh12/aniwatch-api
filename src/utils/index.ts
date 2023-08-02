import { config } from "dotenv";
import createHttpError, { HttpError } from "http-errors";
import { CheerioAPI, SelectorType } from "cheerio";
import { Anime, Top10Anime, Top10AnimeTimePeriod } from "../models";

config();

export const USER_AGENT_HEADER = process.env.APP_SRC_USER_AGENT;
export const ACCEPT_HEADER = process.env.APP_SRC_ACCEPT_HEADER;
export const ACCEPT_ENCODING_HEADER = process.env.APP_SRC_ACCEPT_HEADER;

export const SRC_BASE_URL = process.env.APP_SRC_BASE_URL;
export const SRC_AJAX_URL = process.env.APP_SRC_AJAX_URL;
export const SRC_HOME_URL = process.env.APP_SRC_HOME_URL;
export const SRC_SEARCH_URL = process.env.APP_SRC_SEARCH_URL;

export function extractAnimes(
  $: CheerioAPI,
  selector: SelectorType
): Array<Anime> | HttpError {
  try {
    const animes: Array<Anime> = [];

    $(selector).each((i, el) => {
      const animeId =
        $(el)
          .find(".film-detail .film-name .dynamic-name")
          ?.attr("href")
          ?.slice(1)
          .split("?ref=search")[0] || null;

      animes.push({
        id: animeId,
        name: $(el)
          .find(".film-detail .film-name .dynamic-name")
          ?.text()
          ?.trim(),
        poster:
          $(el)
            .find(".film-poster .film-poster-img")
            ?.attr("data-src")
            ?.trim() || null,
        duration: $(el)
          .find(".film-detail .fd-infor .fdi-item.fdi-duration")
          ?.text()
          ?.trim(),
        type: $(el)
          .find(".film-detail .fd-infor .fdi-item:nth-of-type(1)")
          ?.text()
          ?.trim(),
        rating: $(el).find(".film-poster .tick-rate")?.text()?.trim() || null,
        episodes:
          $(el)
            .find(".film-poster .tick-eps")
            ?.text()
            ?.trim()
            .split(" ")
            .pop() || null,
      });
    });

    return animes;
  } catch (err: any) {
    throw createHttpError.InternalServerError(
      err?.message || "Something went wrong"
    );
  }
}

export function extractTop10Animes(
  $: CheerioAPI,
  period: Top10AnimeTimePeriod
): Array<Top10Anime> | HttpError {
  try {
    const animes: Array<Top10Anime> = [];
    const selector = `#top-viewed-${period} ul li`;

    $(selector).each((i, el) => {
      animes.push({
        id:
          $(el)
            .find(".film-detail .dynamic-name")
            ?.attr("href")
            ?.slice(1)
            .trim() || null,
        rank: Number($(el).find(".film-number span")?.text()?.trim()) || null,
        name: $(el).find(".film-detail .dynamic-name")?.text()?.trim() || null,
        poster:
          $(el)
            .find(".film-poster .film-poster-img")
            ?.attr("data-src")
            ?.trim() || null,
        eps: {
          sub:
            Number(
              $(el)
                .find(".film-detail .fd-infor .tick-item.tick-sub")
                ?.text()
                ?.trim()
            ) || null,
          dub:
            Number(
              $(el)
                .find(".film-detail .fd-infor .tick-item.tick-dub")
                ?.text()
                ?.trim()
            ) || null,
        },
      });
    });

    return animes;
  } catch (err: any) {
    throw createHttpError.InternalServerError(
      err?.message || "Something went wrong"
    );
  }
}
