const path = require('path');

const constructorMethod = (app) => {

    app.get('/', (req, res) => {
        const optiions = {
            root: path.join(__dirname, '../public/')
        };
        res.sendFile('html/index.html', optiions);
    });

    app.use ('*', (req, res) => {
        res.status(404).json({error: 'Not found'});
    });
};

module.exports = constructorMethod;