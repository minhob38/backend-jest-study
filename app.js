const express = require("express");
const app = express();

const apiRoutes = require("./routes/api-routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("hello from employee app");
});

app.use("/api", apiRoutes);

module.exports = app;
