import {MongoClient,Db} from 'mongodb';
import settings from './settings';

let _connection: MongoClient|undefined = undefined;
let _db: Db|undefined = undefined;

export default async (): Promise<Db> => {
    if (!_connection) {
        _connection = await MongoClient.connect(settings.serverUrl,{useNewUrlParser: true});
        _db = await _connection.db(settings.database);
    }
    return _db as Db;
};