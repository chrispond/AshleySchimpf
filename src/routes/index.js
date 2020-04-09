// Dependancies
const express = require("express");
const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");
const ejs = require("ejs");
const indexTemplate = require("../views/index.ejs");
const utils = require("../utils/index");

const homeRouter = express.Router();

homeRouter.get("/", (request, response) => {
  request.prismic.api.getByUID("homepage", "home").then((homeResponse) => {
    request.prismic.api
      .query(Prismic.Predicates.at("document.type", "blog_post"))
      .then((blogResponse) => {
        response.send(
          ejs.render(indexTemplate.default, {
            blogPosts: blogResponse.results,
            global: homeResponse.data,
            PrismicDOM: PrismicDOM,
            rootPath: request.app.locals.rootPath,
            utils,
          })
        );
      });
  });
});

module.exports = homeRouter;
