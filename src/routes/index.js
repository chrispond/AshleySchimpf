// Dependancies
const express = require('express');
const Prismic = require('prismic-javascript');

const router = express.Router();

const homeRouter = router.get('/index', (request, response) => {
	request.prismic.api.getByUID('homepage', 'home').then(homeResponse => {
		request.prismic.api
		.query(Prismic.Predicates.at("document.type", "blog_post"))
		.then(blogResponse => {
			response.render("./index.ejs", {
			// response.json({
				global: homeResponse.data,
				blogPosts: blogResponse.results
			});
		});
	});
});

module.exports = homeRouter;
