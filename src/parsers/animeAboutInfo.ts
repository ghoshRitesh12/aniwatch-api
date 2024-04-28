import {
  SRC_BASE_URL,
  extractAnimes,
  ACCEPT_HEADER,
  USER_AGENT_HEADER,
  ACCEPT_ENCODING_HEADER,
  extractMostPopularAnimes,
} from "../utils/index.js";
import axios, { AxiosError } from "axios";
import createHttpError, { type HttpError } from "http-errors";
import { load, type CheerioAPI, type SelectorType } from "cheerio";
import { type ScrapedAnimeAboutInfo } from "../types/parsers/index.js";

// /anime/info?id=${anime-id}
async function scrapeAnimeAboutInfo(
  id: string
): Promise<ScrapedAnimeAboutInfo | HttpError> {
  const res: ScrapedAnimeAboutInfo = {
    anime: {
      info: {
        id: null,
        anilistId: null,
        malId: null,
        name: null,
        poster: null,
        description: null,
        stats: {
          rating: null,
          quality: null,
          episodes: {
            sub: null,
            dub: null,
          },
          type: null,
          duration: null,
        },
        promotionalVideos: [],
        charactersVoiceActors: [],
      },
      moreInfo: {},
    },
    seasons: [],
    mostPopularAnimes: [],
    relatedAnimes: [],
    recommendedAnimes: [],
  };

  try {
    const animeUrl: URL = new URL(id, SRC_BASE_URL);
    const mainPage = await axios.get(animeUrl.href, {
      headers: {
        "User-Agent": USER_AGENT_HEADER,
        "Accept-Encoding": ACCEPT_ENCODING_HEADER,
        Accept: ACCEPT_HEADER,
      },
    });

    const $: CheerioAPI = load(mainPage.data);

    try {
      res.anime.info.anilistId = Number(
        JSON.parse($("body")?.find("#syncData")?.text())?.anilist_id
      );
      res.anime.info.malId = Number(JSON.parse($("body")?.find("#syncData")?.text())?.mal_id);
    } catch (err) {
      res.anime.info.anilistId = null;
      res.anime.info.malId = null;
    }

    const selector: SelectorType = "#ani_detail .container .anis-content";

    res.anime.info.id =
      $(selector)
        ?.find(".anisc-detail .film-buttons a.btn-play")
        ?.attr("href")
        ?.split("/")
        ?.pop() || null;
    res.anime.info.name =
      $(selector)
        ?.find(".anisc-detail .film-name.dynamic-name")
        ?.text()
        ?.trim() || null;
    res.anime.info.description =
      $(selector)
        ?.find(".anisc-detail .film-description .text")
        .text()
        ?.split("[")
        ?.shift()
        ?.trim() || null;
    res.anime.info.poster =
      $(selector)?.find(".film-poster .film-poster-img")?.attr("src")?.trim() ||
      null;

    // stats
    res.anime.info.stats.rating =
      $(`${selector} .film-stats .tick .tick-pg`)?.text()?.trim() || null;
    res.anime.info.stats.quality =
      $(`${selector} .film-stats .tick .tick-quality`)?.text()?.trim() || null;
    res.anime.info.stats.episodes = {
      sub:
        Number($(`${selector} .film-stats .tick .tick-sub`)?.text()?.trim()) ||
        null,
      dub:
        Number($(`${selector} .film-stats .tick .tick-dub`)?.text()?.trim()) ||
        null,
    };
    res.anime.info.stats.type =
      $(`${selector} .film-stats .tick`)
        ?.text()
        ?.trim()
        ?.replace(/[\s\n]+/g, " ")
        ?.split(" ")
        ?.at(-2) || null;
    res.anime.info.stats.duration =
      $(`${selector} .film-stats .tick`)
        ?.text()
        ?.trim()
        ?.replace(/[\s\n]+/g, " ")
        ?.split(" ")
        ?.pop() || null;
    
    // get promotional videos
    $(".block_area.block_area-promotions .block_area-promotions-list .screen-items .item").each(
      (_, el) => {
        res.anime.info.promotionalVideos.push({
          title: $(el).attr("data-title"),
          source: $(el).attr("data-src"),
          thumbnail: $(el).find("img").attr("src"),
        });
      }
    );

    // get characters and voice actors
    $(".block_area.block_area-actors .block-actors-content .bac-list-wrap .bac-item").each(
      (_, el) => {
        res.anime.info.charactersVoiceActors.push({
          character: {
            id: $(el).find($(".per-info.ltr .pi-avatar")).attr("href")?.split("/")[2] || "",
            poster: $(el).find($(".per-info.ltr .pi-avatar img")).attr("data-src") || "",
            name: $(el).find($(".per-info.ltr .pi-detail a")).text(),
            cast: $(el).find($(".per-info.ltr .pi-detail .pi-cast")).text(),
          },
          voiceActor: {
            id: $(el).find($(".per-info.rtl .pi-avatar")).attr("href")?.split("/")[2] || "",
            poster: $(el).find($(".per-info.rtl .pi-avatar img")).attr("data-src") || "",
            name: $(el).find($(".per-info.rtl .pi-detail a")).text(),
            cast: $(el).find($(".per-info.rtl .pi-detail .pi-cast")).text(),
          },
        });
      }
    );

    // more information
    $(`${selector} .anisc-info-wrap .anisc-info .item:not(.w-hide)`).each(
      (i, el) => {
        let key = $(el)
          .find(".item-head")
          .text()
          .toLowerCase()
          .replace(":", "")
          .trim();
        key = key.includes(" ") ? key.replace(" ", "") : key;

        const value = [
          ...$(el)
            .find("*:not(.item-head)")
            .map((i, el) => $(el).text().trim()),
        ]
          .map((i) => `${i}`)
          .toString()
          .trim();

        if (key === "genres") {
          res.anime.moreInfo[key] = value.split(",").map((i) => i.trim());
          return;
        }
        if (key === "producers") {
          res.anime.moreInfo[key] = value.split(",").map((i) => i.trim());
          return;
        }
        res.anime.moreInfo[key] = value;
      }
    );

    // more seasons
    const seasonsSelector: SelectorType = "#main-content .os-list a.os-item";
    $(seasonsSelector).each((i, el) => {
      res.seasons.push({
        id: $(el)?.attr("href")?.slice(1)?.trim() || null,
        name: $(el)?.attr("title")?.trim() || null,
        title: $(el)?.find(".title")?.text()?.trim(),
        poster:
          $(el)
            ?.find(".season-poster")
            ?.attr("style")
            ?.split(" ")
            ?.pop()
            ?.split("(")
            ?.pop()
            ?.split(")")[0] || null,
        isCurrent: $(el).hasClass("active"),
      });
    });

    const relatedAnimeSelector: SelectorType =
      "#main-sidebar .block_area.block_area_sidebar.block_area-realtime:nth-of-type(1) .anif-block-ul ul li";
    res.relatedAnimes = extractMostPopularAnimes($, relatedAnimeSelector);

    const mostPopularSelector: SelectorType =
      "#main-sidebar .block_area.block_area_sidebar.block_area-realtime:nth-of-type(2) .anif-block-ul ul li";
    res.mostPopularAnimes = extractMostPopularAnimes($, mostPopularSelector);

    const recommendedAnimeSelector: SelectorType =
      "#main-content .block_area.block_area_category .tab-content .flw-item";
    res.recommendedAnimes = extractAnimes($, recommendedAnimeSelector);

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

export default scrapeAnimeAboutInfo;
