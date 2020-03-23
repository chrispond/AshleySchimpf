// Dependancies
const bodyParser = require("body-parser");
const express = require('express');
const methodOverride = require("method-override");
const path = require("path");
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

// Template Settings
// app.set('view engine', 'ejs');

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(methodOverride());
// app.use(require('./middleware/prismic'));

// Routes
// router.use(require('./routes/index'));
// router.use(require('./routes/blog-post'));

router.get('/', (request, response) => {
    response.json({"test": "test"});
});

app.use(`${__dirname}/app/`, router);

module.exports.handler = serverless(app);