import axios from "axios";
import createHttpError from "http-errors";
import { type RequestHandler } from "express";
import { type CheerioAPI, load } from "cheerio";
import { scrapeAnimeEpisodeSources } from "../parsers/index.js";
import { USER_AGENT_HEADER, SRC_BASE_URL } from "../utils/constants.js";
import { type AnimeServers, Servers } from "../types/anime.js";
import { type AnimeEpisodeSrcsQueryParams } from "../types/controllers/index.js";

type AnilistID = number | null;
type MalID = number | null;

// /anime/episode-srcs?id=${episodeId}?server=${server}&category=${category (dub or sub)}
const getAnimeEpisodeSources: RequestHandler<
  unknown,
  Awaited<ReturnType<typeof scrapeAnimeEpisodeSources & AnilistID>>,
  unknown,
  AnimeEpisodeSrcsQueryParams
> = async (req, res, next) => {
  try {
    const episodeId = req.query.id ? decodeURIComponent(req.query.id) : null;

    const server = (
      req.query.server
        ? decodeURIComponent(req.query.server)
        : Servers.VidStreaming
    ) as AnimeServers;

    const category = (
      req.query.category ? decodeURIComponent(req.query.category) : "sub"
    ) as "sub" | "dub";

    if (episodeId === null) {
      throw createHttpError.BadRequest("Anime episode id required");
    }

    let malID: MalID;
    let anilistID: AnilistID;
    const animeURL = new URL(episodeId?.split("?ep=")[0], SRC_BASE_URL)?.href;

    const [episodeSrcData, animeSrc] = await Promise.all([
      scrapeAnimeEpisodeSources(episodeId, server, category),
      axios.get(animeURL, {
        headers: {
          Referer: SRC_BASE_URL,
          "User-Agent": USER_AGENT_HEADER,
          "X-Requested-With": "XMLHttpRequest",
        },
      }),
    ]);

    const $: CheerioAPI = load(animeSrc?.data);

    try {
      anilistID = Number(
        JSON.parse($("body")?.find("#syncData")?.text())?.anilist_id
      );
      malID = Number(JSON.parse($("body")?.find("#syncData")?.text())?.mal_id);
    } catch (err) {
      anilistID = null;
      malID = null;
    }

    res.status(200).json({
      ...episodeSrcData,
      anilistID,
      malID,
    });
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getAnimeEpisodeSources;
