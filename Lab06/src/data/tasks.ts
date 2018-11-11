import {tasks} from '../config/mongoCollections';
import { Collection, Cursor, InsertOneWriteOpResult } from 'mongodb';
import {v1 as uuidv1} from 'uuid';

function _boundValue (value: string|undefined, defaultValue: number, min: number, max: number): number {
    if (!value) {
        return defaultValue;
    }
    let value_num: number = parseInt(value);
    if (value_num < min) {
        return min;
    } else if (value_num > max) {
        return max;
    } else {
        return value_num;
    }
}

const exportMethods = {
    async getTasks (skip: string|undefined, take: string|undefined): Promise<Cursor> {
        const skip_num: number = _boundValue(skip, 0, 0, Infinity);
        const take_num: number = _boundValue(take, 20, 1, 100);
        const tasksCollection: Collection = await tasks();
        return await tasksCollection.find({},{limit: take_num, skip: skip_num});
    },
    async getTasksById (id: string): Promise<Task> {
        const tasksCollection: Collection = await tasks();
        return await tasksCollection.findOne({_id: id});
    },
    async postTask (task: Task): Promise<Task> {
        task._id = uuidv1();
        const tasksCollection = await tasks();
        const result:InsertOneWriteOpResult = await tasksCollection.insertOne(task);

        console.log("result: ", result);
        // return (await tasksCollection.insertOne(task)).ops[0];
        return result.ops[0];
    },
    async putTask (id: string, putContent: Task): Promise<Task> {
        const tasksCollection: Collection = await tasks();
        const oldTask: Task = await tasksCollection.findOne({_id: id});
        delete putContent.comments;
        await tasksCollection.replaceOne({_id: id}, {...oldTask, ...putContent});
        return await tasksCollection.findOne({_id: id});
    },
    async patchTask (id: string, patchContent: any): Promise<Task> {
        delete patchContent.comments;
        const tasksCollection: Collection = await tasks();
        await tasksCollection.updateOne({_id: id}, {$set: patchContent});
        return await tasksCollection.findOne({_id: id});
    },
    async postComments (id: string, comment: Comment): Promise<Task> {
        comment._id = uuidv1();
        const tasksCollection: Collection = await tasks();
        await tasksCollection.updateOne({_id: id}, {$push: {comments: comment}});
        return await tasksCollection.findOne({_id: id});
    },
    async deleteComment (taskId: string, commentId: string): Promise<any> {
        const tasksCollection: Collection = await tasks();
        return await tasksCollection.updateOne({_id: taskId}, {$pull: {comments: {_id: commentId}}});
    }
};

interface Task {
    _id: string;
    title: string;
    description: string;
    hoursEstimated: number;
    completed: boolean;
    comments: Comment[];
}

interface Comment {
    _id: string;
    name: string;
    comment: string;
}

export default exportMethods;