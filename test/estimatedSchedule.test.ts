import { expect, test } from "vitest";
import { scrapeEstimatedSchedule } from "../src/parsers/index.js";

test("returns estimated schedule anime release", async () => {
  const data = await scrapeEstimatedSchedule("2024-03-30");

  expect(data.scheduledAnimes).not.toEqual([]);
});
