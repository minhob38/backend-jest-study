const express = require("express");
const controller = require("../controller/employee.controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "API is working",
    message: "Welcome to the employee api router, here we define all functions"
  });
});

router.post("/contacts", controller.createEmployee);

module.exports = router;
