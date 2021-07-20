const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "API is working",
    message: "Welcome to the employee api router, here we define all functions"
  });
});

module.exports = router;
