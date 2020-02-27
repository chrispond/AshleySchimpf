// Dependancies
const express = require('express');
const serverless = require('serverless-http');
const blogPostRouter = require('../routes/blog-post');

const app = express();
const router = express.Router();
const routerPath = process.env.NODE_ENV === 'dev' ? `/blog-post` : `/.netlify/functions/blog-post/`;

app.use(routerPath, router);

module.exports = blogPostRouter;
module.exports.handler = serverless(app);