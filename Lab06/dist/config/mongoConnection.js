"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const settings_1 = __importDefault(require("./settings"));
let _connection = undefined;
let _db = undefined;
exports.default = async () => {
    if (!_connection) {
        _connection = await mongodb_1.MongoClient.connect(settings_1.default.serverUrl, { useNewUrlParser: true });
        _db = await _connection.db(settings_1.default.database);
    }
    return _db;
};
