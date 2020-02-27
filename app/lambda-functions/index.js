// Dependancies
const express = require('express');
const serverless = require('serverless-http');
const homeRouter = require('../routes/index');

const app = express();
const router = express.Router();
const routerPath = process.env.NODE_ENV === 'dev' ? `/index` : `/.netlify/functions/index/`;

app.use(routerPath, router);

module.exports = homeRouter;
module.exports.handler = serverless(app);
