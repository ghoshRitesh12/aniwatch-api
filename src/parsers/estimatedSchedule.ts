import {
  SRC_HOME_URL,
  SRC_AJAX_URL,
  USER_AGENT_HEADER,
  ACCEPT_ENCODING_HEADER,
} from "../utils/index.js";
import axios, { AxiosError } from "axios";
import createHttpError, { type HttpError } from "http-errors";
import { load, type CheerioAPI, type SelectorType } from "cheerio";
import { type ScrapedEstimatedSchedule } from "../types/parsers/index.js";

// /anime/schedule?date=${date}
async function scrapeEstimatedSchedule(
  date: string
): Promise<ScrapedEstimatedSchedule | HttpError> {
  const res: ScrapedEstimatedSchedule = {
    scheduledAnimes: [],
  };

  try {
    const estScheduleURL =
      `${SRC_AJAX_URL}/schedule/list?tzOffset=-330&date=${date}` as const;

    const mainPage = await axios.get(estScheduleURL, {
      headers: {
        Accept: "*/*",
        Referer: SRC_HOME_URL,
        "User-Agent": USER_AGENT_HEADER,
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Encoding": ACCEPT_ENCODING_HEADER,
      },
    });

    const $: CheerioAPI = load(mainPage?.data?.html);

    const selector: SelectorType = "li";

    if ($(selector)?.text()?.trim()?.includes("No data to display")) {
      return res;
    }

    $(selector).each((_, el) => {
      res.scheduledAnimes.push({
        id: $(el)?.find("a")?.attr("href")?.slice(1)?.trim() || null,
        time: $(el)?.find("a .time")?.text()?.trim() || null,
        name: $(el)?.find("a .film-name.dynamic-name")?.text()?.trim() || null,
        jname:
          $(el)
            ?.find("a .film-name.dynamic-name")
            ?.attr("data-jname")
            ?.trim() || null,
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

export default scrapeEstimatedSchedule;
