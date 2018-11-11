"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoCollections_1 = require("../config/mongoCollections");
const uuid_1 = require("uuid");
function _boundValue(value, defaultValue, min, max) {
    if (!value) {
        return defaultValue;
    }
    let value_num = parseInt(value);
    if (value_num < min) {
        return min;
    }
    else if (value_num > max) {
        return max;
    }
    else {
        return value_num;
    }
}
const exportMethods = {
    async getTasks(skip, take) {
        const skip_num = _boundValue(skip, 0, 0, Infinity);
        const take_num = _boundValue(take, 20, 1, 100);
        const tasksCollection = await mongoCollections_1.tasks();
        return await tasksCollection.find({}, { limit: take_num, skip: skip_num });
    },
    async getTasksById(id) {
        const tasksCollection = await mongoCollections_1.tasks();
        return await tasksCollection.findOne({ _id: id });
    },
    async postTask(task) {
        task._id = uuid_1.v1();
        const tasksCollection = await mongoCollections_1.tasks();
        const result = await tasksCollection.insertOne(task);
        console.log("result: ", result);
        // return (await tasksCollection.insertOne(task)).ops[0];
        return result.ops[0];
    },
    async putTask(id, putContent) {
        const tasksCollection = await mongoCollections_1.tasks();
        const oldTask = await tasksCollection.findOne({ _id: id });
        delete putContent.comments;
        await tasksCollection.replaceOne({ _id: id }, Object.assign({}, oldTask, putContent));
        return await tasksCollection.findOne({ _id: id });
    },
    async patchTask(id, patchContent) {
        delete patchContent.comments;
        const tasksCollection = await mongoCollections_1.tasks();
        await tasksCollection.updateOne({ _id: id }, { $set: patchContent });
        return await tasksCollection.findOne({ _id: id });
    },
    async postComments(id, comment) {
        comment._id = uuid_1.v1();
        const tasksCollection = await mongoCollections_1.tasks();
        await tasksCollection.updateOne({ _id: id }, { $push: { comments: comment } });
        return await tasksCollection.findOne({ _id: id });
    },
    async deleteComment(taskId, commentId) {
        const tasksCollection = await mongoCollections_1.tasks();
        return await tasksCollection.updateOne({ _id: taskId }, { $pull: { comments: { _id: commentId } } });
    }
};
exports.default = exportMethods;
