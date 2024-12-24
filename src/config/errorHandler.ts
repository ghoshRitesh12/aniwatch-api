import { HiAnimeError } from "aniwatch";
import type { ErrorHandler, NotFoundHandler } from "hono";

const errResp: { status: number; message: string } = {
  status: 500,
  message: "Internal Server Error",
};

export const errorHandler: ErrorHandler = (err, c) => {
  console.error(err);

  if (err instanceof HiAnimeError) {
    errResp.status = err.status;
    errResp.message = err.message;
  }

  return c.json(errResp, { status: errResp.status });
};

export const notFoundHandler: NotFoundHandler = (c) => {
  errResp.status = 404;
  errResp.message = "Not Found";

  console.error(errResp);
  return c.json(errResp, { status: errResp.status });
};
