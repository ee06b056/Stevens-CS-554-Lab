const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://boli0617:test006361@ds121814.mlab.com:21814/graphql-boli');
mongoose.connection.once('open', () => {
    console.log('connect to mongodb');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for request on port 4000');
});