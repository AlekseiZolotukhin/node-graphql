const express = require('express');
const app = express();
const graph = require('express-graphql');
const path = require('path');
const APP_PORT = process.env.PORT || 3000; // process.env.PORT we use for prod environment
const sequilize = require('./utils/database');
// in the folder "graphql" we have created 2 files: schema and resolver. So then we need add it here
const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

app.use(express.static(path.join(__dirname, 'public')));

// for get json data from request
app.use(express.json());

app.use( graph({
    schema: schema, // our scheme
    rootValue: resolver, // our resolver
    graphiql: true // for show graphql page in route [our_site_url]/graphql
}));

//middleware for our index.html file inside publuc folder
app.use((req, res, next) => {
    res.sendFile('/index.thml');
});

async function start() {
    try {
        await sequilize.sync(); // if need recreate schema, use option {force: true}
        app.listen(APP_PORT);
    } catch (e) {
        console.log(e)
    }
}

start();
