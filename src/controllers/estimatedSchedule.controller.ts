import createHttpError from "http-errors";
import { type RequestHandler } from "express";
import { scrapeEstimatedSchedule } from "../parsers/index.js";
import { type EstimatedScheduleQueryParams } from "../types/controllers/index.js";

// /anime/schedule?date=${date}
const getEstimatedSchedule: RequestHandler<
  unknown,
  Awaited<ReturnType<typeof scrapeEstimatedSchedule>>,
  unknown,
  EstimatedScheduleQueryParams
> = async (req, res, next) => {
  try {
    const dateQuery = req.query.date
      ? decodeURIComponent(req.query.date as string)
      : null;

    if (dateQuery === null) {
      throw createHttpError.BadRequest("Date payload required");
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateQuery)) {
      throw createHttpError.BadRequest(
        "Invalid date payload format. Months and days must have 2 digits"
      );
    }

    const data = await scrapeEstimatedSchedule(dateQuery);

    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export default getEstimatedSchedule;
