const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const errorHandler = require("errorhandler");
const path = require("path");

const app = express();

// all environments
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "public")));
app.use(errorHandler());

// Middleware to inject prismic context
app.use(require('./middleware/prismic'));

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/blog-post'));

const PORT = app.get("port");

app.listen(PORT, () => {
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

module.exports = app;
