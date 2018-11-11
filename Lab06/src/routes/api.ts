import express, {Router, Request, Response} from 'express';
import {taskData} from '../data';
import { Cursor } from 'mongodb';

const router:Router = express.Router();

router.get('/tasks/', async (req: Request, res: Response): Promise<any> => {
    try {
        const skip: string|undefined = req.query.skip;
        const take: string|undefined = req.query.take;
        // console.log(skip);
        // console.log(isNaN(parseInt(skip as string)));
        if (skip && isNaN(parseInt(skip)) || (take && isNaN(parseInt(take)))) {
            res.status(400).json({message: 'params mismatch'});
            return;
        }
        console.log('get /tasks get called');
        const taskList: Cursor = await taskData.getTasks(skip, take);
        const results: any[] = await taskList.toArray();
        if (results.length == 0) {
            throw "not found";
        }
        res.json(results);
    } catch (e) {
        // console.log(e);
        res.status(404).json({message: 'Task not found'});
    }
});

router.get('/tasks/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        console.log('get /task/:id get called');
        const result = await taskData.getTasksById(req.params.id);
        if (result) {
            throw "error";
        }
        res.json(result);
    } catch (e) {
        // console.log(e);
        res.status(404).json({message: `Task with id: ${req.params.id} not found`});
    }
});

router.post('/tasks/', async(req:Request, res: Response): Promise<any> => {
    try {
        console.log('post /tasks/ get called');
        res.json(await taskData.postTask(req.body));
    } catch (e) {
        // console.log(e);
        res.status(400).json({message: 'Failed to post task'});
    }
});

router.put('/tasks/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.params.id) {
            res.status(400).json({message: 'params missing'});
            return ;
        }
        console.log('put /tasks/:id get called');
        res.json(await taskData.putTask(req.params.id, req.body));
    } catch (e) {
        // console.log(e);
        res.status(404).json({message: 'Failed to put task'});
    }
});

router.patch('/tasks/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.params.id) {
            res.status(400).json({message: 'params missing'});
            return ;
        }
        console.log('patch /tasks/:id get called');
        res.json(await taskData.patchTask(req.params.id, req.body));
    } catch (e) {
        // console.log(e);
        res.status(404).json({message: 'Failed to patch task'});
    }
});

router.post('/tasks/:id/comments/', async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.params.id) {
            res.status(400).json({message: 'params missing'});
            return ;
        }
        console.log('post /tasks/:id/comments get called');
        // console.log(req.body);
        res.json(await taskData.postComments(req.params.id, req.body));
    } catch (e) {
        // console.log(e);
        res.status(400).json({message: 'Failed to post comment'});
    }
});

router.delete('/tasks/:taskId/:commentId', async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.params.taskId || !req.params.commentId) {
            res.status(400).json({message: 'params missing'});
            return ;
        }
        console.log('delete /tasks/:taskId/:commentId get called');
        res.json(await taskData.deleteComment(req.params.taskId, req.params.commentId));
    } catch (e) {
        // console.log(e);
        res.status(404).json({message: 'Failed to delete comment'});
    }
});

export default router;