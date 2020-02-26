const serverless = require('serverless-http');
const app = require("./config");

module.exports.handler = serverless(app);