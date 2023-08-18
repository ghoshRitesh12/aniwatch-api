import {
  SRC_BASE_URL,
  SRC_AJAX_URL,
  USER_AGENT_HEADER,
  retrieveServerId,
} from "../utils";

import axios, { AxiosError } from "axios";
import { load, CheerioAPI } from "cheerio";
import { AnimeServers, Servers } from "../models/anime";
import createHttpError, { HttpError } from "http-errors";
import { ScrapedAnimeEpisodesSources } from "../models/parsers";
import { RapidCloud, StreamSB, StreamTape } from "../extractors";

// vidtreaming -> 4
// rapidcloud  -> 1
// streamsb -> 5
// streamtape -> 3

// /anime/episode-srcs?id=${episodeId}?server=${server}&category=${category (dub or sub)}
async function scrapeAnimeEpisodeSources(
  episodeId: string,
  server: AnimeServers = Servers.VidStreaming,
  category: "sub" | "dub" = "sub"
): Promise<ScrapedAnimeEpisodesSources | HttpError> {
  if (episodeId.startsWith("http")) {
    const serverUrl = new URL(episodeId);
    switch (server) {
      case Servers.VidStreaming:
      case Servers.VidCloud:
        return {
          ...(await new RapidCloud().extract(serverUrl)),
        };
      case Servers.StreamSB:
        return {
          headers: {
            Referer: serverUrl.href,
            watchsb: "streamsb",
            "User-Agent": USER_AGENT_HEADER,
          },
          sources: await new StreamSB().extract(serverUrl, true),
        };
      case Servers.StreamTape:
        return {
          headers: { Referer: serverUrl.href, "User-Agent": USER_AGENT_HEADER },
          sources: await new StreamTape().extract(serverUrl),
        };
      default: // vidcloud
        return {
          headers: { Referer: serverUrl.href },
          ...(await new RapidCloud().extract(serverUrl)),
        };
    }
  }

  const epId = new URL(`/watch/${episodeId}`, SRC_BASE_URL).href;
  console.log(epId);

  try {
    const resp = await axios.get(
      `${SRC_AJAX_URL}/v2/episode/servers?episodeId=${epId.split("?ep=")[1]}`,
      {
        headers: {
          Referer: epId,
          "User-Agent": USER_AGENT_HEADER,
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    const $: CheerioAPI = load(resp.data.html);

    let serverId: string | null = null;

    try {
      console.log("THE SERVER: ", server);

      switch (server) {
        case Servers.VidCloud: {
          serverId = retrieveServerId($, 1, category);
          if (!serverId) throw new Error("RapidCloud not found");
          break;
        }
        case Servers.VidStreaming: {
          serverId = retrieveServerId($, 4, category);
          console.log("SERVER_ID: ", serverId);
          if (!serverId) throw new Error("VidStreaming not found");
          break;
        }
        case Servers.StreamSB: {
          serverId = retrieveServerId($, 5, category);
          if (!serverId) throw new Error("StreamSB not found");
          break;
        }
        case Servers.StreamTape: {
          serverId = retrieveServerId($, 3, category);
          if (!serverId) throw new Error("StreamTape not found");
          break;
        }
      }
    } catch (err) {
      throw createHttpError.NotFound(
        "Couldn't find server. Try another server"
      );
    }

    const {
      data: { link },
    } = await axios.get(`${SRC_AJAX_URL}/v2/episode/sources?id=${serverId}`);
    console.log("THE LINK: ", link);

    return await scrapeAnimeEpisodeSources(link, server);
  } catch (err: any) {
    console.log(err);
    if (err instanceof AxiosError) {
      throw createHttpError(
        err?.response?.status || 500,
        err?.response?.statusText || "Something went wrong"
      );
    }
    throw createHttpError.InternalServerError(err?.message);
  }
}

export default scrapeAnimeEpisodeSources;
