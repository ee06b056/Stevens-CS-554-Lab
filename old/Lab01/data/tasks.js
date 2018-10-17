const mongoCollection = require('../config/mongoCollections');
const tasks = mongoCollection.tasks;
const uuidv1 = require('uuid/v1');

function _boundValue (value, defaultValue, min, max) {
    if (!value) {
        return defaultValue;
    }
    value = parseInt(value);
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return parseInt(value);
    }
}

let exportMethods = {
    async getTasks (skip, take) {
        skip = _boundValue(skip, 0, 0, Infinity);
        take = _boundValue(take, 20, 1, 100);
        const tasksCollection = await tasks();
        return await tasksCollection.find({},{limit: take, skip: skip});
    },
    async getTasksById (id) {
        const tasksCollection = await tasks();
        return await tasksCollection.findOne({_id: id});
    },
    async postTask (task) {
        task._id = uuidv1();
        const tasksCollection = await tasks();
        return (await tasksCollection.insertOne(task)).ops[0];
    },
    async putTask (id, putContent) {
        const tasksCollection = await tasks();
        const oldTask = await tasksCollection.findOne({_id: id});
        delete putContent.comments;
        await tasksCollection.replaceOne({_id: id}, {...oldTask, ...putContent});
        return await tasksCollection.findOne({_id: id});
    },
    async patchTask (id, patchContent) {
        // if (patchContent.comments) {
        //     throw 'Cannot manipulate comments field';
        // }
        delete patchContent.comments;
        const tasksCollection = await tasks();
        await tasksCollection.updateOne({_id: id}, {$set: patchContent});
        return await tasksCollection.findOne({_id: id});
    },
    async postComments (id, comment) {
        comment._id = uuidv1();
        const tasksCollection = await tasks();
        await tasksCollection.updateOne({_id: id}, {$push: {comments: comment}});
        return await tasksCollection.findOne({_id: id});
    },
    async deleteComment (taskId, commentId) {
        const tasksCollection = await tasks();
        return await tasksCollection.updateOne({_id: taskId}, {$pull: {comments: {_id: commentId}}});
    }
};

module.exports = exportMethods;