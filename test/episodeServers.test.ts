import { expect, test } from "vitest";
import { scrapeEpisodeServers } from "../src/parsers/index.js";

test("returns episode source servers", async () => {
  const data = await scrapeEpisodeServers("steinsgate-0-92?ep=2055");

  expect(data.episodeId).not.toEqual(null);
  expect(data.episodeNo).not.toEqual(0);
  expect(data.sub).not.toEqual([]);
  expect(data.dub).not.toEqual([]);
});
