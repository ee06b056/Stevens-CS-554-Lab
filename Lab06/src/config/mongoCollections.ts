import {Collection, Db} from 'mongodb';
import dbConnection from './mongoConnection';
import settings from './settings';
const schema = settings.schema;

const getCollectionFn:(collection: string) => () => Promise<Collection> = (collection: string) => {
    let _col:Collection|undefined = undefined;

    return async () => {
        if (!_col) {
            const db: Db = await dbConnection();
            _col = await db.createCollection(collection, {
                validator: {
                    $jsonSchema: schema
                }
            });
        }
        return _col;
    }
};

const tasks = getCollectionFn('tasks');

export {tasks};
