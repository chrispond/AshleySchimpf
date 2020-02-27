// Dependancies
const express = require('express');
const serverless = require('serverless-http');
const prismicMiddleware = require('../middleware/prismic');

const app = express();
const router = express.Router();
const routerPath = process.env.NODE_ENV === 'dev' ? `/prismic` : `/.netlify/functions/prismic/`;

app.use(routerPath, router);

module.exports = prismicMiddleware;
module.exports.handler = serverless(app);