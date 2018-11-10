import { Request, Response, NextFunction } from "express";

const reqLogger = function (req: Request, res: Response, next: NextFunction): void {
    console.log('*******************************')
    console.log('Logger 1:')
    console.log('The request body: ', req.body);
    console.log(`The request url path: ${req.path}`);
    console.log(`The request verb: ${req.method}`);
    next();
};
const urlCount = function (req: Request, res: Response, next: NextFunction): void {
    const map: Map<string, number> = req.app.locals.methodCount;
    const url: string = req.path;
    console.log(url);
    console.log('Logger 2:');
    if (map.has(url)) {
        const count: number = map.get(url) as number;
        console.log(`${url} has been called ${count + 1} times.`);
        map.set(url, count + 1);
    } else {
        map.set(url, 1);
        console.log(`${url} has been called 1 time.`);
    }
    next();
};

export {reqLogger, urlCount};