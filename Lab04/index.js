const express = require('express');
const configureRoute = require('./routes');

const app = express();

configureRoute(app);

app.listen(3000, () => {
    console.log('Server running on localhost:3000');
});