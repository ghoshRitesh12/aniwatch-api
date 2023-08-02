"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parsers_1 = require("../parsers");
const http_errors_1 = __importDefault(require("http-errors"));
const getAnimeCategory = async (req, res, next) => {
    try {
        const category = decodeURIComponent(req.params.category);
        const page = req.query.page
            ? Number(decodeURIComponent(req.query?.page))
            : 1;
        if (!category)
            throw http_errors_1.default.BadRequest("category required");
        const data = await (0, parsers_1.scrapeAnimeCategory)(category, page);
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
};
exports.default = getAnimeCategory;
