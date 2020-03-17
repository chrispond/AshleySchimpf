// Dependancies
const express = require('express');
const Prismic = require('prismic-javascript');

const router = express.Router();

const blogPostRouter = router.get("/blog/:uid", (request, response) => {
	const uid = request.params.uid;
  
	// Query the post by its uid
	request.prismic.api.getByUID("blog_post", uid).then(blogPost => {
		request.prismic.api
			.query(Prismic.Predicates
			.any("document.type", ["homepage", "blog_post"]))
			.then(prismicResponse => {
				const blogPostsData = prismicResponse.results.filter(item => item.type === 'blog_post');
				const globalData = prismicResponse.results.filter(item => item.type === 'homepage');
  
				if (blogPost) {
				// If a document is returned, render the post
				// response.render("blog-post.ejs", {
				response.json({
					blogPosts: blogPostsData,
					blogPost,
					global: globalData[0].data
				});
			
				// Else display the 404 page
				} else {
					request.status(404).render("404");
				}
    });
	});
});

module.exports = blogPostRouter;
