"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importStar(require("axios"));
const cheerio_1 = require("cheerio");
const utils_1 = require("../utils");
const http_errors_1 = __importDefault(require("http-errors"));
async function scrapeAnimeCategory(category, page = 1) {
    const res = {
        animes: [],
        genres: [],
        top10Animes: {
            today: [],
            week: [],
            month: [],
        },
        category,
        currentPage: Number(page),
        hasNextPage: false,
        totalPages: 0,
    };
    try {
        const scrapeUrl = new URL(category, utils_1.SRC_BASE_URL);
        const mainPage = await axios_1.default.get(`${scrapeUrl}?page=${page}`, {
            headers: {
                "User-Agent": utils_1.USER_AGENT_HEADER,
                "Accept-Encoding": utils_1.ACCEPT_ENCODING_HEADER,
                Accept: utils_1.ACCEPT_HEADER,
            },
        });
        const $ = (0, cheerio_1.load)(mainPage.data);
        const selector = "#main-content .tab-content .film_list-wrap .flw-item";
        res.hasNextPage =
            $(".pagination > li").length > 0
                ? $(".pagination li.active").length > 0
                    ? $(".pagination > li").last().hasClass("active")
                        ? false
                        : true
                    : false
                : false;
        res.totalPages =
            parseInt($('.pagination > .page-item a[title="Last"]')
                ?.attr("href")
                ?.split("=")
                .pop() ??
                $('.pagination > .page-item a[title="Next"]')
                    ?.attr("href")
                    ?.split("=")
                    .pop() ??
                $(".pagination > .page-item.active a")?.text()?.trim()) || 0;
        if (res.totalPages === 0 && !res.hasNextPage) {
            res.totalPages = 0;
        }
        res.animes = (0, utils_1.extractAnimes)($, selector);
        if (res.animes.length === 0) {
            res.totalPages = 0;
            res.hasNextPage = false;
        }
        const genreSelector = "#main-sidebar .block_area.block_area_sidebar.block_area-genres .sb-genre-list li";
        $(genreSelector).each((i, el) => {
            res.genres.push(`${$(el).text().trim()}`);
        });
        const top10AnimeSelector = '#main-sidebar .block_area-realtime [id^="top-viewed-"]';
        $(top10AnimeSelector).each((i, el) => {
            const period = $(el).attr("id")?.split("-")?.pop()?.trim();
            if (period === "day") {
                res.top10Animes.today = (0, utils_1.extractTop10Animes)($, period);
                return;
            }
            if (period === "week") {
                res.top10Animes.week = (0, utils_1.extractTop10Animes)($, period);
                return;
            }
            if (period === "month") {
                res.top10Animes.month = (0, utils_1.extractTop10Animes)($, period);
            }
        });
        return res;
    }
    catch (err) {
        if (err instanceof axios_1.AxiosError) {
            throw (0, http_errors_1.default)(err?.response?.status || 500, err?.response?.statusText || "Something went wrong");
        }
        throw http_errors_1.default.InternalServerError(err?.message);
    }
}
exports.default = scrapeAnimeCategory;
