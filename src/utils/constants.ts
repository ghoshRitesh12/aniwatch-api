import { config } from "dotenv";

config();

export const ACCEPT_ENCODING_HEADER = "gzip, deflate, br";
export const USER_AGENT_HEADER =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4692.71 Safari/537.36";
export const ACCEPT_HEADER =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9";

// previously aniwatch.to || aniwatchtv.to
const DOMAIN = process.env.DOMAIN || "hianime.to";

export const SRC_BASE_URL = `https://${DOMAIN}`;
export const SRC_AJAX_URL = `${SRC_BASE_URL}/ajax`;
export const SRC_HOME_URL = `${SRC_BASE_URL}/home`;
export const SRC_SEARCH_URL = `${SRC_BASE_URL}/search`;

// <SearchPageFilters>
export const genresIdMap: Record<string, number> = {
  action: 1,
  adventure: 2,
  cars: 3,
  comedy: 4,
  dementia: 5,
  demons: 6,
  drama: 8,
  ecchi: 9,
  fantasy: 10,
  game: 11,
  harem: 35,
  historical: 13,
  horror: 14,
  isekai: 44,
  josei: 43,
  kids: 15,
  magic: 16,
  "martial-arts": 17,
  mecha: 18,
  military: 38,
  music: 19,
  mystery: 7,
  parody: 20,
  police: 39,
  psychological: 40,
  romance: 22,
  samurai: 21,
  school: 23,
  "sci-fi": 24,
  seinen: 42,
  shoujo: 25,
  "shoujo-ai": 26,
  shounen: 27,
  "shounen-ai": 28,
  "slice-of-life": 36,
  space: 29,
  sports: 30,
  "super-power": 31,
  supernatural: 37,
  thriller: 41,
  vampire: 32,
} as const;

export const typeIdMap: Record<string, number> = {
  all: 0,
  movie: 1,
  tv: 2,
  ova: 3,
  ona: 4,
  special: 5,
  music: 6,
} as const;

export const statusIdMap: Record<string, number> = {
  all: 0,
  "finished-airing": 1,
  "currently-airing": 2,
  "not-yet-aired": 3,
} as const;

export const ratedIdMap: Record<string, number> = {
  all: 0,
  g: 1,
  pg: 2,
  "pg-13": 3,
  r: 4,
  "r+": 5,
  rx: 6,
} as const;

export const scoreIdMap: Record<string, number> = {
  all: 0,
  appalling: 1,
  horrible: 2,
  "very-bad": 3,
  bad: 4,
  average: 5,
  fine: 6,
  good: 7,
  "very-good": 8,
  great: 9,
  masterpiece: 10,
} as const;

export const seasonIdMap: Record<string, number> = {
  all: 0,
  spring: 1,
  summer: 2,
  fall: 3,
  winter: 4,
} as const;

export const languageIdMap: Record<string, number> = {
  all: 0,
  sub: 1,
  dub: 2,
  "sub-&-dub": 3,
} as const;

export const sortIdMap: Record<string, string> = {
  default: "default",
  "recently-added": "recently_added",
  "recently-updated": "recently_updated",
  score: "score",
  "name-a-z": "name_az",
  "released-date": "released_date",
  "most-watched": "most_watched",
} as const;
// </SearchPageFilters>
