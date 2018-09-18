const express = require('express');
const router = express.Router();
const data = require('../data');
const taskData = data.tasks;

router.get('/tasks/', async (req, res) => {
    try {
        console.log('get /tasks get called');
        let taskList = await taskData.getTasks(req.query.skip, req.query.take);
        res.json(await taskList.toArray());
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Task not found'});
    }
});

router.get('/tasks/:id', async (req, res) => {
    try {
        console.log('get /task/:id get called');
        // console.log(await taskData.getTasksById(req.params.id));
        res.json(await taskData.getTasksById(req.params.id));
    } catch (e) {
        console.log(e);
        res.status(404).json({message: `Task with id: ${req.params.id} not found`});
    }
});

router.post('/tasks/', async(req, res) => {
    try {
        console.log('post /tasks/ get called');
        res.json(await taskData.postTask(req.body));
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Failed to post task'});
    }
});

router.put('/tasks/:id', async (req, res) => {
    try {
        console.log('put /tasks/:id get called');
        res.json(await taskData.putTask(req.params.id, req.body));
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Failed to put task'});
    }
});

router.patch('/tasks/:id', async (req, res) => {
    try {
        console.log('patch /tasks/:id get called');
        res.json(await taskData.patchTask(req.params.id, req.body));
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Failed to patch task'});
    }
});

router.post('/tasks/:id/comments/', async (req, res) => {
    try {
        console.log('post /tasks/:id/comments get called');
        console.log(req.body);
        res.json(await taskData.postComments(req.params.id, req.body));
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Failed to post comment'});
    }
});

router.delete('/tasks/:taskId/:commentId', async (req, res) => {
    try {
        console.log('delete /tasks/:taskId/:commentId get called');
        res.json(await taskData.deleteComment(req.params.taskId, req.params.commentId));
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Failed to delete comment'});
    }
});

module.exports = router;