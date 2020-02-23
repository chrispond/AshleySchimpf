const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");
const request = require("request");
const PrismicConfig = require("./prismic-configuration");
const Onboarding = require("./onboarding");
const app = require("./config");

const PORT = app.get("port");

app.listen(PORT, () => {
  Onboarding.trigger();
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

// Middleware to inject prismic context
app.use((req, res, next) => {
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
});

/*
 *  --[ INSERT YOUR ROUTES HERE ]--
 */

/*
 * Route with documentation to build your project with prismic
 */

app.route('/').get((req, res) => {
  let homeData;
  let blogData;

  req.prismic.api.getByUID('homepage', 'home').then(response => {
    homeData = response;

    req.prismic.api
    .query(Prismic.Predicates.at("document.type", "blog_post"))
    .then(response => {
      blogData = response;

      res.render("index", {
        home: homeData.data,
        blogPosts: blogData.results
      });
    });
  });
});

/**
 * Route for blog posts
 */
app.get("/blog/:uid", (req, res) => {
  // Define the uid from the url
  const uid = req.params.uid;

  // Query the post by its uid
  req.prismic.api.getByUID("blog_post", uid).then(blogPost => {
    req.prismic.api
    .query(Prismic.Predicates.any("document.type", ["homepage", "blog_post"]))
    .then(response => {
      const blogPostsData = response.results.filter(item => item.type === 'blog_post');
      const globalData = response.results.filter(item => item.type === 'homepage');

      if (blogPost) {
        // If a document is returned, render the post
        res.render("post", {
          blogPosts: blogPostsData,
          blogPost,
          global: globalData[0].data
        });
  
        // Else display the 404 page
      } else {
        res.status(404).render("404");
      }
    });
  });
});

app.set('port', PORT || 3000);
