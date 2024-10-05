import { Hono } from "hono";
import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();
const hianimeRouter = new Hono();

// /api/v2/hianime
hianimeRouter.get("/", (c) => c.redirect("/", 301));

// /api/v2/hianime/home
hianimeRouter.get("/home", async (c) => {
  const data = await hianime.getHomePage();
  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/category/{name}?page={page}
hianimeRouter.get("/category/:name", async (c) => {
  const categoryName = decodeURIComponent(
    c.req.param("name").trim()
  ) as HiAnime.AnimeCategories;

  const page: number =
    Number(decodeURIComponent(c.req.query("page") || "")) || 1;

  const data = await hianime.getCategoryAnime(categoryName, page);
  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/genre/{name}?page={page}
hianimeRouter.get("/genre/:name", async (c) => {
  const genreName = decodeURIComponent(c.req.param("name").trim());
  const page: number =
    Number(decodeURIComponent(c.req.query("page") || "")) || 1;

  const data = await hianime.getGenreAnime(genreName, page);
  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/producer/{name}?page={page}
hianimeRouter.get("/producer/:name", async (c) => {
  const producerName = decodeURIComponent(c.req.param("name").trim());
  const page: number =
    Number(decodeURIComponent(c.req.query("page") || "")) || 1;

  const data = await hianime.getProducerAnimes(producerName, page);
  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/schedule?date={date}
hianimeRouter.get("/schedule", async (c) => {
  const date = decodeURIComponent(c.req.query("date") || "");

  const data = await hianime.getEstimatedSchedule(date);
  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/search?q={query}&page={page}&filters={...filters}
hianimeRouter.get("/search", async (c) => {
  let { q: query, page, ...filters } = c.req.query();

  query = decodeURIComponent(query || "");
  const pageNo = Number(decodeURIComponent(page || "")) || 1;

  const data = await hianime.search(query, pageNo, filters);
  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/search/suggestion?q={query}
hianimeRouter.get("/search/suggestion", async (c) => {
  const query = decodeURIComponent(c.req.query("q") || "");

  const data = await hianime.searchSuggestions(query);
  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/anime/{animeId}
hianimeRouter.get("/anime/:animeId", async (c) => {
  const animeId = decodeURIComponent(c.req.param("animeId").trim());
  const data = await hianime.getInfo(animeId);

  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/episode/servers?animeEpisodeId={id}
hianimeRouter.get("/episode/servers", async (c) => {
  const animeEpisodeId = decodeURIComponent(
    c.req.query("animeEpisodeId") || ""
  );

  const data = await hianime.getEpisodeServers(animeEpisodeId);
  return c.json({ success: true, data }, { status: 200 });
});

// episodeId=steinsgate-3?ep=230
// /api/v2/hianime/episode/sources?animeEpisodeId={episodeId}?server={server}&category={category (dub or sub)}
hianimeRouter.get("/episode/sources", async (c) => {
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

  const data = await hianime.getEpisodeSources(
    animeEpisodeId,
    server,
    category
  );
  return c.json({ success: true, data }, { status: 200 });
});

// /api/v2/hianime/anime/{anime-id}/episodes
hianimeRouter.get("/anime/:animeId/episodes", async (c) => {
  const animeId = decodeURIComponent(c.req.param("animeId").trim());
  const data = await hianime.getEpisodes(animeId);

  return c.json({ success: true, data }, { status: 200 });
});

export { hianimeRouter };
