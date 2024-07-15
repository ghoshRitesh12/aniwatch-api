import { expect, test } from "vitest";
import { scrapeEstimatedSchedule } from "../src/parsers/index.js";

function padZero(num: number) {
  return num < 10 ? `0${num}` : num.toString();
}

test("returns estimated schedule anime release", async () => {
  const d = new Date();
  const data = await scrapeEstimatedSchedule(
    `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`
  );

  expect(data.scheduledAnimes).not.toEqual([]);
});
