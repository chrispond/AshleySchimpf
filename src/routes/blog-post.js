// Dependancies
const express = require("express");
const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");
const ejs = require("ejs");
const blogTemplate = require("../views/blog-post.ejs");
const utils = require("../utils/index");

const router = express.Router();

const blogPostRouter = router.get("/:uid", (request, response) => {
  const uid = request.params.uid;

  // Query the post by its uid
  request.prismic.api.getByUID("blog_post", uid).then((blogPost) => {
    request.prismic.api
      .query(Prismic.Predicates.any("document.type", ["homepage", "blog_post"]))
      .then((prismicResponse) => {
        const blogPostsData = prismicResponse.results.filter(
          (item) => item.type === "blog_post"
        );
        const globalData = prismicResponse.results.filter(
          (item) => item.type === "homepage"
        );

        if (blogPost) {
          response.send(
            ejs.render(blogTemplate.default, {
              blogPost,
              blogPosts: blogPostsData,
              global: globalData[0].data,
              PrismicDOM: PrismicDOM,
              rootPath: request.app.locals.rootPath,
              utils,
            })
          );
        } else {
          request.status(404).render("404");
        }
      });
  });
});

module.exports = blogPostRouter;
