"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reqLogger = function (req, res, next) {
    console.log('*******************************');
    console.log('Logger 1:');
    console.log('The request body: ', req.body);
    console.log(`The request url path: ${req.path}`);
    console.log(`The request verb: ${req.method}`);
    next();
};
exports.reqLogger = reqLogger;
const urlCount = function (req, res, next) {
    const map = req.app.locals.methodCount;
    const url = req.path;
    console.log(url);
    console.log('Logger 2:');
    if (map.has(url)) {
        const count = map.get(url);
        console.log(`${url} has been called ${count + 1} times.`);
        map.set(url, count + 1);
    }
    else {
        map.set(url, 1);
        console.log(`${url} has been called 1 time.`);
    }
    next();
};
exports.urlCount = urlCount;
