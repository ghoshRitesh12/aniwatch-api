import { expect, test } from "vitest";
import { scrapeAnimeSearchSuggestion } from "../src/parsers/index.js";

test("returns animes search suggestions related to search query", async () => {
  const data = await scrapeAnimeSearchSuggestion("one piece");

  expect(data.suggestions).not.toEqual([]);
});
