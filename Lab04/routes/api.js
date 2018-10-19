const apiRouter = require('express').Router();
const redis = require('redis').createClient();
const Promise = require('bluebird');
Promise.promisifyAll(redis);
const data = require('../data');

function updateList (historyList, id) {
    if (historyList.length == 20) {
        historyList.shift();
    }
    historyList.push(id);
}

apiRouter.get('/people/history', async (req, res) => {
    const historyList = req.app.get('history');
    if (historyList.length <= 0) {
        res.sendStatus(404);
        return ;
    }
    const result = [];
    for (let id of historyList) {
        result.push(JSON.parse(await redis.getAsync(id)));
    }
    res.send(result);
});

apiRouter.get('/people/:id', async (req, res) => {
    const result = await redis.getAsync(req.params.id);
    if (result) {
        updateList(req.app.get('history'), req.params.id);
        res.send(JSON.parse(result));
        return;
    }
    data.getById(req.params.id).then((response) => {
        updateList(req.app.get('history'), req.params.id);
        redis.setAsync(req.params.id, JSON.stringify(response));
        res.send(response);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(404);
    });
});

module.exports = apiRouter;