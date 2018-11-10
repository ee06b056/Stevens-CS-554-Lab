"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
const middleware_1 = require("./middleware");
const body_parser_1 = __importDefault(require("body-parser"));
exports.default = (app) => {
    app.locals.methodCount = new Map();
    app.use(body_parser_1.default.json());
    app.use(middleware_1.reqLogger);
    app.use(middleware_1.urlCount);
    app.use('/api', api_1.default);
    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};
