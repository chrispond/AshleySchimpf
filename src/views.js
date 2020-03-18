let fs = require("fs");
var contents = fs.readFileSync(`./src/views/index.ejs`, 'utf8');

export async function handler(event, context) {
    return {
        statusCode: 200,
        body: contents
    };
}