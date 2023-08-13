import { scrapeProducerAnimes } from "../src/parsers";

test("returns animes produced by a producer", async () => {
  const data = await scrapeProducerAnimes("toei-animation", 2);

  expect(data.animes).not.toEqual([]);
  expect(data.topAiringAnimes).not.toEqual([]);
  expect(data.top10Animes.today).not.toEqual([]);
  expect(data.top10Animes.week).not.toEqual([]);
  expect(data.top10Animes.month).not.toEqual([]);
});
