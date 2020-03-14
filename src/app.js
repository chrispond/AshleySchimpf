// Dependancies
const bodyParser = require("body-parser");
const express = require('express');
const methodOverride = require("method-override");
const path = require("path");
const serverless = require('serverless-http');

const Prismic = require('prismic-javascript');

const app = express();
const router = express.Router();

// Settings
app.set("views", path.join("./src/views"));
app.engine('ejs', require('ejs').__express);

app.use(express.static(path.join("./dist/public")));
// app.use(express.static(__dirname + '../public'));

// Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(methodOverride());
router.use(require('./middleware/prismic'));

// Routes
router.use(require('./routes/index'));
router.use(require('./routes/blog-post'));

app.use('/app', router);

module.exports.handler = serverless(app);