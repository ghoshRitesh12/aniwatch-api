import { expect, test } from "vitest";
import { scrapeEstimatedSchedule } from "../src/parsers/index.js";

test("returns estimated schedule anime release", async () => {
  const d = new Date();
  const data = await scrapeEstimatedSchedule(
    `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  );

  expect(data.scheduledAnimes).not.toEqual([]);
});
