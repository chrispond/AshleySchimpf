// Dependancies
const express = require('express');
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const ejs = require('ejs');
const indexTemplate = require(`../views/index.ejs`);

const router = express.Router();

const homeRouter = router.get('/', (request, response) => {
	request.prismic.api.getByUID('homepage', 'home').then(homeResponse => {
		request.prismic.api
		.query(Prismic.Predicates.at("document.type", "blog_post"))
		.then(blogResponse => {
			response.send(
				ejs.render(
					indexTemplate.default, 
					{
						global: homeResponse.data, 
						blogPosts: blogResponse.results,
						PrismicDOM: PrismicDOM
					})
			);
		})
	});
});

module.exports = homeRouter;
