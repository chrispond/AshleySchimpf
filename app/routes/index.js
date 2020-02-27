// Dependancies
const express = require('express');
const Prismic = require('prismic-javascript');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

const homeRouter = router.get('/', (request, response) => {
	request.prismic.api.getByUID('homepage', 'home').then(homeResponse => {
		request.prismic.api
		.query(Prismic.Predicates.at("document.type", "blog_post"))
		.then(blogResponse => {
			response.render("index", {
				global: homeResponse.data,
				blogPosts: blogResponse.results
			});
		});
	});
});

const routerPath = process.env.NODE_ENV === 'dev' ? `/index` : `/.netlify/functions/index`;
app.use(routerPath, router)

module.exports = homeRouter;
module.exports.handler = serverless(app);
