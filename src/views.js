let fs = require("fs");
let path = require("path");

export async function handler(event, context) {
    var contents = fs.readFileSync(`./src/views/index.ejs`, 'utf8');
    return {
        statusCode: 200,
        body: contents
    };
}