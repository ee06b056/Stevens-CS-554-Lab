const dbConnection = require('./mongoConnection');
const schema = require('./settings').schema;

const getCollectionFn = (collection) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            // console.log('get collection method is called');
            const db = await dbConnection();
            // _col = await db.collection(collection);
            // console.log('the _col get from collection method: ', _col);
            // TO-DO json validation shcema
            // console.log(schema);
            _col = await db.createCollection("tasks", {
                validator: {
                    $jsonSchema: schema
                }
            });
            // console.log('The _col get from createCollection method', _col);
        }
        return _col;
    }
};

module.exports = {
    tasks: getCollectionFn('tasks')
};