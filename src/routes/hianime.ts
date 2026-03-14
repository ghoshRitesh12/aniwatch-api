import { Hono } from "hono";
import { HiAnime } from "aniwatch";
import { cache } from "../config/cache.js";
import type { ServerContext } from "../config/context.js";

const hianime = new HiAnime.Scraper();
const hianimeRouter = new Hono<ServerContext>();

// /api/v2/hianime
hianimeRouter.get("/", (c) => c.redirect("/", 301));

// /api/v2/hianime/health
hianimeRouter.get("/health", async (c) => {
    try {
        // Test the scraper functionality
        const testData = await hianime.getHomePage();
        const isWorking = testData && testData.spotlightAnimes && testData.spotlightAnimes.length > 0;
        
        return c.json({
            status: 200,
            message: "Aniwatch API is healthy",
            scraper: {
                working: isWorking,
                spotlightAnimesCount: testData?.spotlightAnimes?.length || 0,
                trendingAnimesCount: testData?.trendingAnimes?.length || 0
            }
        }, { status: 200 });
    } catch (error) {
        return c.json({
            status: 503,
            message: "Aniwatch API is unhealthy",
            error: error instanceof Error ? error.message : "Unknown error",
            scraper: {
                working: false
            }
        }, { status: 503 });
    }
});

// /api/v2/hianime/home
hianimeRouter.get("/home", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");

    const data = await cache.getOrSet<HiAnime.ScrapedHomePage>(
        hianime.getHomePage,
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

// /api/v2/hianime/azlist/{sortOption}?page={page}
hianimeRouter.get("/azlist/:sortOption", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");

    const sortOption = decodeURIComponent(
        c.req.param("sortOption").trim().toLowerCase()
    ) as HiAnime.AZListSortOptions;
    const page: number =
        Number(decodeURIComponent(c.req.query("page") || "")) || 1;

    const data = await cache.getOrSet<HiAnime.ScrapedAnimeAZList>(
        async () => hianime.getAZList(sortOption, page),
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

// /api/v2/hianime/qtip/{animeId}
hianimeRouter.get("/qtip/:animeId", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const animeId = decodeURIComponent(c.req.param("animeId").trim());

    const data = await cache.getOrSet<HiAnime.ScrapedAnimeQtipInfo>(
        async () => hianime.getQtipInfo(animeId),
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
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
        async () => hianime.getCategoryAnime(categoryName, page),
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

// /api/v2/hianime/genre/{name}?page={page}
hianimeRouter.get("/genre/:name", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const genreName = decodeURIComponent(c.req.param("name").trim());
    const page: number =
        Number(decodeURIComponent(c.req.query("page") || "")) || 1;

    const data = await cache.getOrSet<HiAnime.ScrapedGenreAnime>(
        async () => hianime.getGenreAnime(genreName, page),
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

// /api/v2/hianime/producer/{name}?page={page}
hianimeRouter.get("/producer/:name", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const producerName = decodeURIComponent(c.req.param("name").trim());
    const page: number =
        Number(decodeURIComponent(c.req.query("page") || "")) || 1;

    const data = await cache.getOrSet<HiAnime.ScrapedProducerAnime>(
        async () => hianime.getProducerAnimes(producerName, page),
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

// /api/v2/hianime/schedule?date={date}&tzOffset={tzOffset}
hianimeRouter.get("/schedule", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");

    const date = decodeURIComponent(c.req.query("date") || "");
    let tzOffset = Number(
        decodeURIComponent(c.req.query("tzOffset") || "-330")
    );
    tzOffset = isNaN(tzOffset) ? -330 : tzOffset;

    const data = await cache.getOrSet<HiAnime.ScrapedEstimatedSchedule>(
        async () => hianime.getEstimatedSchedule(date, tzOffset),
        `${cacheConfig.key}_${tzOffset}`,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

// /api/v2/hianime/search?q={query}&page={page}&filters={...filters}
hianimeRouter.get("/search", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    let { q: query, page, ...filters } = c.req.query();

    query = decodeURIComponent(query || "");
    const pageNo = Number(decodeURIComponent(page || "")) || 1;

    const data = await cache.getOrSet<HiAnime.ScrapedAnimeSearchResult>(
        async () => hianime.search(query, pageNo, filters),
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

// /api/v2/hianime/search/suggestion?q={query}
hianimeRouter.get("/search/suggestion", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const query = decodeURIComponent(c.req.query("q") || "");

    const data = await cache.getOrSet<HiAnime.ScrapedAnimeSearchSuggestion>(
        async () => hianime.searchSuggestions(query),
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

// /api/v2/hianime/anime/{animeId}
hianimeRouter.get("/anime/:animeId", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const animeId = decodeURIComponent(c.req.param("animeId").trim());

    const data = await cache.getOrSet<HiAnime.ScrapedAnimeAboutInfo>(
        async () => hianime.getInfo(animeId),
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

// /api/v2/hianime/episode/servers?animeEpisodeId={id}
hianimeRouter.get("/episode/servers", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const animeEpisodeId = decodeURIComponent(
        c.req.query("animeEpisodeId") || ""
    );

    const data = await cache.getOrSet<HiAnime.ScrapedEpisodeServers>(
        async () => hianime.getEpisodeServers(animeEpisodeId),
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

// /api/v2/hianime/episode/test-servers?animeEpisodeId={id}&category={category}
hianimeRouter.get("/episode/test-servers", async (c) => {
    const animeEpisodeId = decodeURIComponent(
        c.req.query("animeEpisodeId") || ""
    );
    const category = decodeURIComponent(c.req.query("category") || "sub") as
        | "sub"
        | "dub"
        | "raw";

    const testServers = ["hd-1", "hd-2", "hd-3", "vidstreaming", "megacloud"] as const;
    const results: { server: string; working: boolean; error?: string }[] = [];

    for (const server of testServers) {
        try {
            await hianime.getEpisodeSources(animeEpisodeId, server as HiAnime.AnimeServers, category);
            results.push({ server, working: true });
        } catch (error) {
            results.push({ 
                server, 
                working: false, 
                error: error instanceof Error ? error.message : "Unknown error" 
            });
        }
    }

    const workingServers = results.filter(r => r.working).map(r => r.server);
    const brokenServers = results.filter(r => !r.working).map(r => r.server);

    return c.json({
        status: 200,
        data: {
            animeEpisodeId,
            category,
            testResults: results,
            workingServers,
            brokenServers,
            summary: {
                total: testServers.length,
                working: workingServers.length,
                broken: brokenServers.length
            }
        }
    }, { status: 200 });
});

// /api/v2/hianime/episode/validate-streaming?animeEpisodeId={id}&server={server}&category={category}
hianimeRouter.get("/episode/validate-streaming", async (c) => {
    const animeEpisodeId = decodeURIComponent(
        c.req.query("animeEpisodeId") || ""
    );
    const server = decodeURIComponent(
        c.req.query("server") || "hd-1"
    ) as HiAnime.AnimeServers;
    const category = decodeURIComponent(c.req.query("category") || "sub") as
        | "sub"
        | "dub"
        | "raw";

    try {
        const data = await hianime.getEpisodeSources(animeEpisodeId, server, category);
        
        if (!data.sources || data.sources.length === 0) {
            return c.json({
                status: 404,
                message: "No streaming sources found",
                data: { sources: [] }
            }, { status: 404 });
        }

        // Test each source URL
        const sourceValidation = await Promise.all(
            data.sources.map(async (source, index) => {
                try {
                    const response = await fetch(source.url, {
                        method: 'HEAD',
                        headers: {
                            'Referer': data.headers?.Referer || 'https://hianimez.to/',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        }
                    });
                    
                    return {
                        index,
                        url: source.url,
                        status: response.status,
                        statusText: response.statusText,
                        working: response.ok,
                        headers: Object.fromEntries(response.headers.entries()),
                        contentType: response.headers.get('content-type')
                    };
                } catch (error) {
                    return {
                        index,
                        url: source.url,
                        status: 'ERROR',
                        statusText: error instanceof Error ? error.message : 'Unknown error',
                        working: false,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    };
                }
            })
        );

        const workingSources = sourceValidation.filter(s => s.working);
        const brokenSources = sourceValidation.filter(s => !s.working);

        return c.json({
            status: 200,
            data: {
                animeEpisodeId,
                server,
                category,
                originalData: data,
                validation: {
                    totalSources: data.sources.length,
                    workingSources: workingSources.length,
                    brokenSources: brokenSources.length,
                    sourceValidation,
                    summary: {
                        hasWorkingSources: workingSources.length > 0,
                        hasBrokenSources: brokenSources.length > 0,
                        allSourcesWorking: brokenSources.length === 0
                    }
                },
                recommendations: {
                    ifAllBroken: "Try a different server or refresh the episode",
                    ifSomeWorking: "Use the working sources, broken ones may be expired",
                    headers: data.headers || {},
                    troubleshooting: {
                        "403 Forbidden": "Add the Referer header from the response",
                        "404 Not Found": "URL may have expired, try refreshing the episode",
                        "CORS Error": "Use a proxy or add appropriate CORS headers"
                    }
                }
            }
        }, { status: 200 });

    } catch (error) {
        return c.json({
            status: 500,
            message: "Failed to validate streaming sources",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
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

    try {
        const data = await cache.getOrSet<HiAnime.ScrapedAnimeEpisodesSources>(
            async () => hianime.getEpisodeSources(animeEpisodeId, server, category),
            cacheConfig.key,
            cacheConfig.duration
        );

        // Enhance the response with additional information for streaming
        const enhancedData = {
            ...data,
            streamingInfo: {
                note: "Streaming URLs may require specific headers to work properly",
                requiredHeaders: data.headers || {},
                commonHeaders: {
                    "Referer": data.headers?.Referer || "https://hianimez.to/",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                },
                troubleshooting: {
                    "403 Forbidden": "Add the Referer header from the response",
                    "404 Not Found": "URL may have expired, try refreshing the episode",
                    "CORS Error": "Use a proxy or add appropriate CORS headers"
                }
            }
        };

        return c.json({ status: 200, data: enhancedData }, { status: 200 });
    } catch (error) {
        // Handle specific error for servers that return empty responses
        if (error instanceof Error && error.message.includes("cheerio.load() expects a string")) {
            return c.json({
                status: 503,
                message: `Server '${server}' is currently unavailable or returning empty responses. Please try a different server.`,
                error: "SERVER_UNAVAILABLE",
                availableServers: ["hd-1", "hd-2"], // List working servers
                suggestion: "Try using hd-1 or hd-2 instead"
            }, { status: 503 });
        }
        
        // Re-throw other errors to be handled by the global error handler
        throw error;
    }
});

// /api/v2/hianime/anime/{anime-id}/episodes
hianimeRouter.get("/anime/:animeId/episodes", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const animeId = decodeURIComponent(c.req.param("animeId").trim());

    const data = await cache.getOrSet<HiAnime.ScrapedAnimeEpisodes>(
        async () => hianime.getEpisodes(animeId),
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

// /api/v2/hianime/anime/{anime-id}/next-episode-schedule
hianimeRouter.get("/anime/:animeId/next-episode-schedule", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const animeId = decodeURIComponent(c.req.param("animeId").trim());

    const data = await cache.getOrSet<HiAnime.ScrapedNextEpisodeSchedule>(
        async () => hianime.getNextEpisodeSchedule(animeId),
        cacheConfig.key,
        cacheConfig.duration
    );

    return c.json({ status: 200, data }, { status: 200 });
});

export { hianimeRouter };
