module.exports = {
  apiEndpoint: 'https://ashley-schimpf.prismic.io/api/v2',
  linkResolver(doc) {
    if (doc.type === 'blog_post') {
      return '/blog/' + doc.uid;
    }

    return '/';
  }
};
