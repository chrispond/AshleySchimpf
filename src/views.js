let fs = require("fs");
const htmlTemplate = require(`${__dirname}/views/index.ejs`);

export async function handler(event, context) {
    return {
        statusCode: 200,
        body: htmlTemplate
    };
}