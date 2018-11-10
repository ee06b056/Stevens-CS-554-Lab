"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoConnection_1 = __importDefault(require("./mongoConnection"));
const settings_1 = __importDefault(require("./settings"));
const schema = settings_1.default.schema;
const getCollectionFn = (collection) => {
    let _col = undefined;
    return async () => {
        if (!_col) {
            const db = await mongoConnection_1.default();
            _col = await db.createCollection(collection, {
                validator: {
                    $jsonSchema: schema
                }
            });
        }
        return _col;
    };
};
const tasks = getCollectionFn('tasks');
exports.tasks = tasks;
