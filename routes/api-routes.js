const express = require("express");
const controller = require("../controller/employee.controller");
const verifyToken = require("./jwt-token-verify");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "API is working",
    message: "Welcome to the employee api router, here we define all functions"
  });
});

router.post("/contacts", controller.createEmployee);
router.get("/contacts", controller.getAllEmployees);
router.get("/contacts/:employee_id", controller.getEmployeeById);
router.put(
  "/contacts/:employee_id",
  verifyToken,
  controller.updateEmployeeById
);
router.delete("/contacts/:employee_id", controller.deleteByEmployeeId);
router.post("/contacts/login", controller.loginEmployee);

module.exports = router;
