import { expect, test } from "vitest";
import { scrapeAnimeEpisodeSources } from "../src/parsers/index.js";

test("returns anime episode streaming link(s)", async () => {
  const data = await scrapeAnimeEpisodeSources(
    "steinsgate-3?ep=230",
    "vidstreaming",
    "sub"
  );

  expect(data.sources).not.toEqual([]);
  // expect(data)
});
