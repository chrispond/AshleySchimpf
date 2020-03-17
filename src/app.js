// Dependancies
const bodyParser = require("body-parser");
const express = require('express');
const methodOverride = require("method-override");
const path = require("path");
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

// Template Settings
app.set("views", path.join("./src/views"));
app.engine('ejs', require('ejs').__express);

// Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(methodOverride());
// router.use('/public', express.static('./dist/public'));
router.use(require('./middleware/prismic'));

// Routes
router.get('/', (request, response) => {
    response.json({
        "hello": "world"
    });
});
router.use(require('./routes/index'));
router.use(require('./routes/blog-post'));

app.use('/.netlify/functions/app/', router);

module.exports.handler = serverless(app);