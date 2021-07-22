const mongodb = require("./mongodb/mongodb.utils");
const app = require("./app");
const port = 8000;
require("dotenv").config();

console.log("!!!")
console.log(typeof process.env.ENV)

mongodb.connect();

app.listen(port, () => {
  console.log(`running employee app on ${port} port`);
});
