const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
    if (!_connection) {
        _connection = await MongoClient.connect(settings.serverUrl,{useNewUrlParser: true});
        _db = await _connection.db(settings.database);
    }
    return _db;
};