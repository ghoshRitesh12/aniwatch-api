import {
  SRC_BASE_URL,
  SRC_AJAX_URL,
  ACCEPT_HEADER,
  USER_AGENT_HEADER,
  ACCEPT_ENCODING_HEADER,
} from "../utils/index.js";
import axios, { AxiosError } from "axios";
import createHttpError, { type HttpError } from "http-errors";
import { load, type CheerioAPI, type SelectorType } from "cheerio";
import type { ScrapedEpisodeServers } from "../types/parsers/index.js";

// /anime/servers?episodeId=${id}
async function scrapeEpisodeServers(
  episodeId: string
): Promise<ScrapedEpisodeServers | HttpError> {
  const res: ScrapedEpisodeServers = {
    sub: [],
    dub: [],
    raw: [],
    episodeId,
    episodeNo: 0,
  };

  try {
    const epId = episodeId.split("?ep=")[1];

    const { data } = await axios.get(
      `${SRC_AJAX_URL}/v2/episode/servers?episodeId=${epId}`,
      {
        headers: {
          Accept: ACCEPT_HEADER,
          "User-Agent": USER_AGENT_HEADER,
          "X-Requested-With": "XMLHttpRequest",
          "Accept-Encoding": ACCEPT_ENCODING_HEADER,
          Referer: new URL(`/watch/${episodeId}`, SRC_BASE_URL).href,
        },
      }
    );

    const $: CheerioAPI = load(data.html);

    const epNoSelector: SelectorType = ".server-notice strong";
    res.episodeNo = Number($(epNoSelector).text().split(" ").pop()) || 0;

    $(`.ps_-block.ps_-block-sub.servers-sub .ps__-list .server-item`).each(
      (_, el) => {
        res.sub.push({
          serverName: $(el).find("a").text().toLowerCase().trim(),
          serverId: Number($(el)?.attr("data-server-id")?.trim()) || null,
        });
      }
    );

    $(`.ps_-block.ps_-block-sub.servers-dub .ps__-list .server-item`).each(
      (_, el) => {
        res.dub.push({
          serverName: $(el).find("a").text().toLowerCase().trim(),
          serverId: Number($(el)?.attr("data-server-id")?.trim()) || null,
        });
      }
    );

    $(`.ps_-block.ps_-block-sub.servers-raw .ps__-list .server-item`).each(
      (_, el) => {
        res.raw.push({
          serverName: $(el).find("a").text().toLowerCase().trim(),
          serverId: Number($(el)?.attr("data-server-id")?.trim()) || null,
        });
      }
    );

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

export default scrapeEpisodeServers;
