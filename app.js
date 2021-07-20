const express = require("express");
const mongodb = require("./mongodb/mongodb.utils");
const port = 8000;
const app = express();

const apiRoutes = require("./routes/api-routes");

app.use("/api", apiRoutes);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("hello from employee app");
});

mongodb.connect();

app.listen(port, () => {
  console.log(`running employee app on ${port} port`);
});
