"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTop10Animes = exports.extractAnimes = exports.SRC_SEARCH_URL = exports.SRC_HOME_URL = exports.SRC_AJAX_URL = exports.SRC_BASE_URL = exports.ACCEPT_ENCODING_HEADER = exports.ACCEPT_HEADER = exports.USER_AGENT_HEADER = void 0;
const dotenv_1 = require("dotenv");
const http_errors_1 = __importDefault(require("http-errors"));
(0, dotenv_1.config)();
exports.USER_AGENT_HEADER = process.env.APP_SRC_USER_AGENT;
exports.ACCEPT_HEADER = process.env.APP_SRC_ACCEPT_HEADER;
exports.ACCEPT_ENCODING_HEADER = process.env.APP_SRC_ACCEPT_HEADER;
exports.SRC_BASE_URL = process.env.APP_SRC_BASE_URL;
exports.SRC_AJAX_URL = process.env.APP_SRC_AJAX_URL;
exports.SRC_HOME_URL = process.env.APP_SRC_HOME_URL;
exports.SRC_SEARCH_URL = process.env.APP_SRC_SEARCH_URL;
function extractAnimes($, selector) {
    try {
        const animes = [];
        $(selector).each((i, el) => {
            const animeId = $(el)
                .find(".film-detail .film-name .dynamic-name")
                ?.attr("href")
                ?.slice(1)
                .split("?ref=search")[0] || null;
            animes.push({
                id: animeId,
                name: $(el)
                    .find(".film-detail .film-name .dynamic-name")
                    ?.text()
                    ?.trim(),
                poster: $(el)
                    .find(".film-poster .film-poster-img")
                    ?.attr("data-src")
                    ?.trim() || null,
                duration: $(el)
                    .find(".film-detail .fd-infor .fdi-item.fdi-duration")
                    ?.text()
                    ?.trim(),
                type: $(el)
                    .find(".film-detail .fd-infor .fdi-item:nth-of-type(1)")
                    ?.text()
                    ?.trim(),
                rating: $(el).find(".film-poster .tick-rate")?.text()?.trim() || null,
                episodes: $(el)
                    .find(".film-poster .tick-eps")
                    ?.text()
                    ?.trim()
                    .split(" ")
                    .pop() || null,
            });
        });
        return animes;
    }
    catch (err) {
        throw http_errors_1.default.InternalServerError(err?.message || "Something went wrong");
    }
}
exports.extractAnimes = extractAnimes;
function extractTop10Animes($, period) {
    try {
        const animes = [];
        const selector = `#top-viewed-${period} ul li`;
        $(selector).each((i, el) => {
            animes.push({
                id: $(el)
                    .find(".film-detail .dynamic-name")
                    ?.attr("href")
                    ?.slice(1)
                    .trim() || null,
                rank: Number($(el).find(".film-number span")?.text()?.trim()) || null,
                name: $(el).find(".film-detail .dynamic-name")?.text()?.trim() || null,
                poster: $(el)
                    .find(".film-poster .film-poster-img")
                    ?.attr("data-src")
                    ?.trim() || null,
                eps: {
                    sub: Number($(el)
                        .find(".film-detail .fd-infor .tick-item.tick-sub")
                        ?.text()
                        ?.trim()) || null,
                    dub: Number($(el)
                        .find(".film-detail .fd-infor .tick-item.tick-dub")
                        ?.text()
                        ?.trim()) || null,
                },
            });
        });
        return animes;
    }
    catch (err) {
        throw http_errors_1.default.InternalServerError(err?.message || "Something went wrong");
    }
}
exports.extractTop10Animes = extractTop10Animes;
