// Dependancies
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

router.get('/', (request, response) => {
    response.json({"test": "test"});
});

app.use('/', router);

module.exports.handler = serverless(app);
