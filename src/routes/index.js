// Dependancies
const express = require('express');
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const ejs = require('ejs');
const fs = require('fs');

const router = express.Router();

const homeRouter = router.get('/index', (request, response) => {
	request.prismic.api.getByUID('homepage', 'home').then(homeResponse => {
		request.prismic.api
		.query(Prismic.Predicates.at("document.type", "blog_post"))
		.then(blogResponse => {
			fs.readFile('/src/views/index.ejs', 'utf8', function(err, data) {
				if (err) {
				  response.json({error: err});
				} else {
				  response.send(ejs.render(data, {global: homeResponse.data, blogPosts: blogResponse.results, PrismicDOM}));
				}
			  });
		})
	});
});

module.exports = homeRouter;
