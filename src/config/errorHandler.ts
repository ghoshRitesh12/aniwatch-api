import { HiAnimeError } from "aniwatch";
import type { ErrorHandler, NotFoundHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

const errResp: { status: ContentfulStatusCode; message: string } = {
  status: 500,
  message: "Internal Server Error",
};

export const errorHandler: ErrorHandler = (err, c) => {
  console.error(err);

  if (err instanceof HiAnimeError) {
    errResp.status = err.status as ContentfulStatusCode;
    errResp.message = err.message;
  }

  return c.json(errResp, errResp.status);
};

export const notFoundHandler: NotFoundHandler = (c) => {
  errResp.status = 404;
  errResp.message = "Not Found";

  console.error(errResp);
  return c.json(errResp, errResp.status);
};
