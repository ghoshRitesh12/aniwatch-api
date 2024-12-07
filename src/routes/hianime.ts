import { Hono } from "hono";
import { HiAnime } from "aniwatch";
import { cache } from "../config/cache.js";
import type { AniwatchAPIVariables } from "../config/variables.js";

const hianime = new HiAnime.Scraper();
const hianimeRouter = new Hono<{ Variables: AniwatchAPIVariables }>();

// /api/v2/hianime
hianimeRouter.get("/", (c) => c.redirect("/", 301));

// /api/v2/hianime/home
hianimeRouter.get("/home", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");

  const data = await cache.getOrSet<HiAnime.ScrapedHomePage>(
    cacheConfig.key,
    hianime.getHomePage,
    cacheConfig.duration
  );

  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/category/{name}?page={page}
hianimeRouter.get("/category/:name", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");
  const categoryName = decodeURIComponent(
    c.req.param("name").trim()
  ) as HiAnime.AnimeCategories;
  const page: number =
    Number(decodeURIComponent(c.req.query("page") || "")) || 1;

  const data = await cache.getOrSet<HiAnime.ScrapedAnimeCategory>(
    cacheConfig.key,
    async () => hianime.getCategoryAnime(categoryName, page),
    cacheConfig.duration
  );

  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/genre/{name}?page={page}
hianimeRouter.get("/genre/:name", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");
  const genreName = decodeURIComponent(c.req.param("name").trim());
  const page: number =
    Number(decodeURIComponent(c.req.query("page") || "")) || 1;

  const data = await cache.getOrSet<HiAnime.ScrapedGenreAnime>(
    cacheConfig.key,
    async () => hianime.getGenreAnime(genreName, page),
    cacheConfig.duration
  );

  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/producer/{name}?page={page}
hianimeRouter.get("/producer/:name", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");
  const producerName = decodeURIComponent(c.req.param("name").trim());
  const page: number =
    Number(decodeURIComponent(c.req.query("page") || "")) || 1;

  const data = await cache.getOrSet<HiAnime.ScrapedProducerAnime>(
    cacheConfig.key,
    async () => hianime.getProducerAnimes(producerName, page),
    cacheConfig.duration
  );

  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/schedule?date={date}
hianimeRouter.get("/schedule", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");
  const date = decodeURIComponent(c.req.query("date") || "");

  const data = await cache.getOrSet<HiAnime.ScrapedEstimatedSchedule>(
    cacheConfig.key,
    async () => hianime.getEstimatedSchedule(date),
    cacheConfig.duration
  );

  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/search?q={query}&page={page}&filters={...filters}
hianimeRouter.get("/search", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");
  let { q: query, page, ...filters } = c.req.query();

  query = decodeURIComponent(query || "");
  const pageNo = Number(decodeURIComponent(page || "")) || 1;

  const data = await cache.getOrSet<HiAnime.ScrapedAnimeSearchResult>(
    cacheConfig.key,
    async () => hianime.search(query, pageNo, filters),
    cacheConfig.duration
  );

  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/search/suggestion?q={query}
hianimeRouter.get("/search/suggestion", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");
  const query = decodeURIComponent(c.req.query("q") || "");

  const data = await cache.getOrSet<HiAnime.ScrapedAnimeSearchSuggestion>(
    cacheConfig.key,
    async () => hianime.searchSuggestions(query),
    cacheConfig.duration
  );

  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/anime/{animeId}
hianimeRouter.get("/anime/:animeId", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");
  const animeId = decodeURIComponent(c.req.param("animeId").trim());

  const data = await cache.getOrSet<HiAnime.ScrapedAnimeAboutInfo>(
    cacheConfig.key,
    async () => hianime.getInfo(animeId),
    cacheConfig.duration
  );

  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/episode/servers?animeEpisodeId={id}
hianimeRouter.get("/episode/servers", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");
  const animeEpisodeId = decodeURIComponent(
    c.req.query("animeEpisodeId") || ""
  );

  const data = await cache.getOrSet<HiAnime.ScrapedEpisodeServers>(
    cacheConfig.key,
    async () => hianime.getEpisodeServers(animeEpisodeId),
    cacheConfig.duration
  );

  return c.json({ success: true, data }, { status: 200 });
});

// episodeId=steinsgate-3?ep=230
// /api/v2/hianime/episode/sources?animeEpisodeId={episodeId}?server={server}&category={category (dub or sub)}
hianimeRouter.get("/episode/sources", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");
  const animeEpisodeId = decodeURIComponent(
    c.req.query("animeEpisodeId") || ""
  );
  const server = decodeURIComponent(
    c.req.query("server") || HiAnime.Servers.VidStreaming
  ) as HiAnime.AnimeServers;
  const category = decodeURIComponent(c.req.query("category") || "sub") as
    | "sub"
    | "dub"
    | "raw";

  const data = await cache.getOrSet<HiAnime.ScrapedAnimeEpisodesSources>(
    cacheConfig.key,
    async () => hianime.getEpisodeSources(animeEpisodeId, server, category),
    cacheConfig.duration
  );

  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/anime/{anime-id}/episodes
hianimeRouter.get("/anime/:animeId/episodes", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");
  const animeId = decodeURIComponent(c.req.param("animeId").trim());

  const data = await cache.getOrSet<HiAnime.ScrapedAnimeEpisodes>(
    cacheConfig.key,
    async () => hianime.getEpisodes(animeId),
    cacheConfig.duration
  );

  return c.json({ success: true, data }, { status: 200 });
});

export { hianimeRouter };
