
const app = require("./config");
const PORT = app.get("port");

if(process.env.NODE_ENV === 'dev'){
  app.listen(PORT, () => {
    process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
  });
}



