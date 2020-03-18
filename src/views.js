let fs = require("fs");
const rContents = require(`${__dirname}/views/index.ejs`);

export async function handler(event, context) {
    return {
        statusCode: 200,
        body: rContents
    };
}