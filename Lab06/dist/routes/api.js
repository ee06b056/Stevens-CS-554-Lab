"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("../data");
const router = express_1.default.Router();
router.get('/tasks/', async (req, res) => {
    try {
        const skip = req.query.skip;
        const take = req.query.take;
        // console.log(skip);
        // console.log(isNaN(parseInt(skip as string)));
        if (skip && isNaN(parseInt(skip)) || (take && isNaN(parseInt(take)))) {
            res.status(400).json({ message: 'params mismatch' });
            return;
        }
        console.log('get /tasks get called');
        const taskList = await data_1.taskData.getTasks(skip, take);
        const results = await taskList.toArray();
        if (results.length == 0) {
            throw "not found";
        }
        res.json(results);
    }
    catch (e) {
        // console.log(e);
        res.status(404).json({ message: 'Task not found' });
    }
});
router.get('/tasks/:id', async (req, res) => {
    try {
        console.log('get /task/:id get called');
        const result = await data_1.taskData.getTasksById(req.params.id);
        if (result) {
            throw "error";
        }
        res.json(result);
    }
    catch (e) {
        // console.log(e);
        res.status(404).json({ message: `Task with id: ${req.params.id} not found` });
    }
});
router.post('/tasks/', async (req, res) => {
    try {
        console.log('post /tasks/ get called');
        res.json(await data_1.taskData.postTask(req.body));
    }
    catch (e) {
        // console.log(e);
        res.status(400).json({ message: 'Failed to post task' });
    }
});
router.put('/tasks/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'params missing' });
            return;
        }
        console.log('put /tasks/:id get called');
        res.json(await data_1.taskData.putTask(req.params.id, req.body));
    }
    catch (e) {
        // console.log(e);
        res.status(404).json({ message: 'Failed to put task' });
    }
});
router.patch('/tasks/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'params missing' });
            return;
        }
        console.log('patch /tasks/:id get called');
        res.json(await data_1.taskData.patchTask(req.params.id, req.body));
    }
    catch (e) {
        // console.log(e);
        res.status(404).json({ message: 'Failed to patch task' });
    }
});
router.post('/tasks/:id/comments/', async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'params missing' });
            return;
        }
        console.log('post /tasks/:id/comments get called');
        // console.log(req.body);
        res.json(await data_1.taskData.postComments(req.params.id, req.body));
    }
    catch (e) {
        // console.log(e);
        res.status(400).json({ message: 'Failed to post comment' });
    }
});
router.delete('/tasks/:taskId/:commentId', async (req, res) => {
    try {
        if (!req.params.taskId || !req.params.commentId) {
            res.status(400).json({ message: 'params missing' });
            return;
        }
        console.log('delete /tasks/:taskId/:commentId get called');
        res.json(await data_1.taskData.deleteComment(req.params.taskId, req.params.commentId));
    }
    catch (e) {
        // console.log(e);
        res.status(404).json({ message: 'Failed to delete comment' });
    }
});
exports.default = router;
