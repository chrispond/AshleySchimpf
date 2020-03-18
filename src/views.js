const fs = require("fs").promises;
const path = require("path");

const viewsHandler = async () => {
    fs.readdir('views', (error, files) => {
        console.log('----', error, files);
    });
};

// const viewsHandler = async () => {
//   try {
//     const content = await fs.readFile(path.join(__dirname, `${fileName}.ejs`), {
//       encoding: "utf-8"
//     });
//     return {
//       statusCode: 200,
//       body: content
//     };
//   } catch (e) {
//     return {
//       statusCode: 500,
//       body: e
//     };
//   }
// };

exports.handler = viewsHandler;