// Dependancies
const express = require('express');
const Prismic = require('prismic-javascript');
const PrismicConfig = require("../prismic-configuration");
const PrismicDOM = require("prismic-dom");
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

const prismicRouter = (req, res, next) => {
  res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  Prismic.api(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req
  })
    .then(api => {
      req.prismic = { api };
      next();
    })
    .catch(error => {
      next(error.message);
    });
};

const routerPath = process.env.NODE_ENV === 'dev' ? `/prismic` : `/.netlify/functions/prismic`;
app.use(routerPath, router)

module.exports = prismicRouter;
module.exports.handler = serverless(app);
