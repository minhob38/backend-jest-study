const emplyeemoodel = require("../model/employee.model");

exports.createEmployee = async (req, res, next) => {
  try {
    const newEmployee = await emplyeemoodel.create(req.body);
    res.status(201).json(newEmployee);
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
}
