import {Application, Request, Response} from 'express';
import apiRoutes from './api';
import {reqLogger, urlCount} from './middleware';
import bodyParser from 'body-parser';

export default (app: Application): void => {

    app.locals.methodCount = new Map<string, number>();

    app.use(bodyParser.json());

    app.use(reqLogger);
    app.use(urlCount); 
    app.use('/api', apiRoutes);

    app.use ('*', (req:Request, res:Response): void => {
        res.status(404).json({error: 'Not found'});
    });
};