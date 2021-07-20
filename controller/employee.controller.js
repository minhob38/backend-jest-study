const joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const employeeModel = require("../model/employee.model");
require("dotenv").config();

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

exports.getAllEmployees = async (req, res, next) => {
  try {
    const allEmployees = await employeeModel.find({});

    if (allEmployees && allEmployees.length > 0) {
      res.status(200).json(allEmployees);
    } else {
      res.status(404).json("not found");
    }
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeModel.findById(req.params.employee_id);

    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).send("not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.updateEmployeeById = async (req, res, next) => {
  try {
    const updateEmployee = await employeeModel.findByIdAndUpdate(
      req.params.employee_id,
      req.body,
      {
        useFindAndModify: false
      }
    );

    if (this.updateEmployee) {
      res.status(201).json(updatedEmployee)
    } else {
      res.status(400).send();
    }
  } catch(err) {
    console.log(err);
  }
};


exports.deleteByEmployeeId = async (req, res, next) => {
  employeeModel.findByIdAndDelete(req.params.employee_id)
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log("User Not Fount");
        res.status(404).json("User Not Found");
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.loginEmployee = async (req, res, next) => {
  try {
    const joiCheck = await schema.validate(req.body);

    if (joiCheck.error) {
      return res.status(400).json(joiCheck.error);
    }

    const employee = await employeeModel.findOne({ email: req.body.email });

    if (!employee) {
      return res.status(400).json("Email you provided already exist in out database");
    }

    const validatePassword = await bcrypt.compare(req.body.password, employee.password);

    if (!validatePassword) {
      return res.status(400).send("you provided an invalid password, please try again");
    }

    const jwtToken = await jwt.sign({
      data: employee
    }, process.env.JWT_TOKEN_KEY, { expiresIn: "1h" });

    res.header("auth-token", jwtToken);
    res.status(201).json(newEmployee);
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
}