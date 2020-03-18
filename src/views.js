let fs = require("fs");
const htmlTemplate = require(`./views/index.ejs`);

export async function handler(event, context) {
    return {
        statusCode: 200,
        body: htmlTemplate
    };
}