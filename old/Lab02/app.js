const express = require('express');
const app = express();
const configRoutes = require('./routes');

app.use(express.static('public'));

configRoutes(app);

app.listen(3000, () => {
    console.log('Server start on port 3000');
});