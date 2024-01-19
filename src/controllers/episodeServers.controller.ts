import createHttpError from "http-errors";
import { type RequestHandler } from "express";
import { scrapeEpisodeServers } from "../parsers/index.js";
import { type EpisodeServersQueryParams } from "../types/controllers/index.js";

// /anime/servers?episodeId=${id}
const getEpisodeServers: RequestHandler<
  unknown,
  Awaited<ReturnType<typeof scrapeEpisodeServers>>,
  unknown,
  EpisodeServersQueryParams
> = async (req, res, next) => {
  try {
    const episodeId = req.query.episodeId
      ? decodeURIComponent(req.query?.episodeId as string)
      : null;

    if (episodeId === null) {
      throw createHttpError.BadRequest("Episode id required");
    }

    const data = await scrapeEpisodeServers(episodeId);
    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getEpisodeServers;
