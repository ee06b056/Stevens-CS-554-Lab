const apiRoutes = require('./api');
const middleware = require('./middleware');
const bodyParser = require('body-parser');

const constructorMethod = (app) => {

    app.locals.methodCount = new Map();

    app.use(bodyParser.json());

    app.use(middleware.reqLogger);
    app.use(middleware.urlCount); 
    app.use('/api', apiRoutes);

    app.use ('*', (req, res) => {
        res.status(404).json({error: 'Not found'});
    });
};

module.exports = constructorMethod;