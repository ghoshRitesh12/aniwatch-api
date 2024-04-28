import type {
  Anime,
  Top10Anime,
  MostPopularAnime,
  Top10AnimeTimePeriod,
} from "../types/anime.js";
import type { CheerioAPI, SelectorType } from "cheerio";
import {
  genresIdMap,
  languageIdMap,
  ratedIdMap,
  scoreIdMap,
  seasonIdMap,
  sortIdMap,
  statusIdMap,
  typeIdMap,
} from "./constants.js";
import { type FilterKeys } from "../types/controllers/animeSearch.js";
import createHttpError, { HttpError } from "http-errors";

export const extractAnimes = (
  $: CheerioAPI,
  selector: SelectorType
): Array<Anime> | HttpError => {
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
        episodes: {
          sub:
            Number(
              $(el)
                .find(".film-poster .tick-sub")
                ?.text()
                ?.trim()
                .split(" ")
                .pop()
            ) || null,
          dub:
            Number(
              $(el)
                .find(".film-poster .tick-dub")
                ?.text()
                ?.trim()
                .split(" ")
                .pop()
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
};

export const extractTop10Animes = (
  $: CheerioAPI,
  period: Top10AnimeTimePeriod
): Array<Top10Anime> | HttpError => {
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
        episodes: {
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
};

export const extractMostPopularAnimes = (
  $: CheerioAPI,
  selector: SelectorType
): Array<MostPopularAnime> | HttpError => {
  try {
    const animes: Array<MostPopularAnime> = [];

    $(selector).each((i, el) => {
      animes.push({
        id:
          $(el)
            .find(".film-detail .dynamic-name")
            ?.attr("href")
            ?.slice(1)
            .trim() || null,
        name: $(el).find(".film-detail .dynamic-name")?.text()?.trim() || null,
        poster:
          $(el)
            .find(".film-poster .film-poster-img")
            ?.attr("data-src")
            ?.trim() || null,
        jname:
          $(el)
            .find(".film-detail .film-name .dynamic-name")
            .attr("data-jname")
            ?.trim() || null,

        episodes: {
          sub:
            Number($(el)?.find(".fd-infor .tick .tick-sub")?.text()?.trim()) ||
            null,
          dub:
            Number($(el)?.find(".fd-infor .tick .tick-dub")?.text()?.trim()) ||
            null,
        },
        type:
          $(el)
            ?.find(".fd-infor .tick")
            ?.text()
            ?.trim()
            ?.replace(/[\s\n]+/g, " ")
            ?.split(" ")
            ?.pop() || null,
      });
    });

    return animes;
  } catch (err: any) {
    throw createHttpError.InternalServerError(
      err?.message || "Something went wrong"
    );
  }
};

export function retrieveServerId(
  $: CheerioAPI,
  index: number,
  category: "sub" | "dub" | "raw"
) {
  return (
    $(`.ps_-block.ps_-block-sub.servers-${category} > .ps__-list .server-item`)
      ?.map((_, el) =>
        $(el).attr("data-server-id") == `${index}` ? $(el) : null
      )
      ?.get()[0]
      ?.attr("data-id") || null
  );
}

function getGenresFilterVal(genreNames: string[]): string | undefined {
  if (genreNames.length < 1) {
    return undefined;
  }
  return genreNames.map((name) => genresIdMap[name]).join(",");
}

export function getSearchFilterValue(
  key: FilterKeys,
  rawValue: string
): string | undefined {
  rawValue = rawValue.trim();
  if (!rawValue) return undefined;

  switch (key) {
    case "genres": {
      return getGenresFilterVal(rawValue.split(","));
    }
    case "type": {
      const val = typeIdMap[rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "status": {
      const val = statusIdMap[rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "rated": {
      const val = ratedIdMap[rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "score": {
      const val = scoreIdMap[rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "season": {
      const val = seasonIdMap[rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "language": {
      const val = languageIdMap[rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "sort": {
      return sortIdMap[rawValue] ?? undefined;
    }
    default:
      return undefined;
  }
}

// this fn tackles both start_date and end_date
export function getSearchDateFilterValue(
  isStartDate: boolean,
  rawValue: string
): string[] | undefined {
  rawValue = rawValue.trim();
  if (!rawValue) return undefined;

  const dateRegex = /^\d{4}-([0-9]|1[0-2])-([0-9]|[12][0-9]|3[01])$/;
  const dateCategory = isStartDate ? "s" : "e";
  const [year, month, date] = rawValue.split("-");

  if (!dateRegex.test(rawValue)) {
    return undefined;
  }

  // sample return -> [sy=2023, sm=10, sd=11]
  return [
    Number(year) > 0 ? `${dateCategory}y=${year}` : "",
    Number(month) > 0 ? `${dateCategory}m=${month}` : "",
    Number(date) > 0 ? `${dateCategory}d=${date}` : "",
  ].filter((d) => Boolean(d));
}

export function substringAfter(str: string, toFind: string) {
  const index = str.indexOf(toFind);
  return index == -1 ? "" : str.substring(index + toFind.length);
}

export function substringBefore(str: string, toFind: string) {
  const index = str.indexOf(toFind);
  return index == -1 ? "" : str.substring(0, index);
}
