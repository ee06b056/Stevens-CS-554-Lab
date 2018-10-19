const apiRoute = require('./api');

const configureRoute = (app) => {
    app.set('history', new Array());
    app.use('/api/', apiRoute);
}

module.exports = configureRoute;