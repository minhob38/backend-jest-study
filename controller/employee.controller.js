const joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

const employeeModel = require("../model/employee.model");
const saltRounds = 10;

const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().min(6).max(12).required(),
  gender: joi.string(),
  phone: joi.string()
});

exports.createEmployee = async (req, res, next) => {
  try {
    const joiCheck = await schema.validate(req.body);

    if (joiCheck.error) {
      return res.status(400).json(joiCheck.error);
    }

    const doEmailExist = await employeeModel.findOne({ email: req.body.email });

    if (doEmailExist) {
      return res.status(400).json("Email you provided already exist in out database");
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = encryptedPassword;

    const newEmployee = await employeeModel.create(req.body); // password schema에 왜 안걸리지... joi를 더 공부해보자...?
    res.status(201).json(newEmployee);
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
}
