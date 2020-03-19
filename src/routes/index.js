// Dependancies
const express = require('express');
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const ejs = require('ejs');
const fs = require('fs');
const path = require("path");
const indexTemplate = require(`../views/index.ejs`);

const router = express.Router();
// const currentDir = process.env.LAMBDA_TASK_ROOT;

const homeRouter = router.get('/index', (request, response) => {
	request.prismic.api.getByUID('homepage', 'home').then(homeResponse => {
		request.prismic.api
		.query(Prismic.Predicates.at("document.type", "blog_post"))
		.then(blogResponse => {
			fs.readdir(__dirname, function(err, items) {			 
				response.json({
					dir: __dirname});
			});

			// fs.readFile(path.join(`${__dirname}/index.ejs`), 'utf8', function(err, data) {
			// 	if (err) {
			// 	  response.json({dir: __dirname, error: err});
			// 	} else {
			// 	  response.send(ejs.render(data, {global: homeResponse.data, blogPosts: blogResponse.results, PrismicDOM}));
			// 	}
			//   });
		})
	});
});

module.exports = homeRouter;
