const httpMock = require("node-mocks-http");
const bcrypt = require("bcrypt");
const controller = require("../../controller/employee.controller");
const model = require("../../model/employee.model");
const mockEmployee = require("../mockdata/employeeReqPayload.json");

model.create = jest.fn();
model.findOne = jest.fn();
bcrypt.hash = jest.fn();
bcrypt.genSalt = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMock.createRequest();
  res = httpMock.createResponse();
  next = null;
});

afterEach(() => {
  model.create.mockClear();
  model.findOne.mockClear();
  bcrypt.hash.mockClear();
  bcrypt.genSalt.mockClear();
});

describe("controller.createEmployee", () => {
  test("createEmployee function is defined", ()  => {
    expect(typeof controller.createEmployee).toBe("function")
  });

  test("create a valid employee", async () => {
    req.body = mockEmployee;
    model.create.mockReturnValue(mockEmployee);
    model.findOne.mockReturnValue(false);
    bcrypt.hash.mockReturnValue("password");
    bcrypt.genSalt.mockReturnValue(10);
    await controller.createEmployee(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual(mockEmployee);
    expect(model.create).toBeCalledWith({ ...mockEmployee, password: "password"});
  });

  test("create employtee which already exists", async () => {
    req.body = mockEmployee;
    model.create.mockReturnValue(mockEmployee);
    model.findOne.mockReturnValue(true);
    await controller.createEmployee(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toStrictEqual("Email you provided already exist in out database");
  });


  test("create a valid employee, but password hashing failed", async () => {
    req.body = mockEmployee;
    model.create.mockReturnValue(mockEmployee);
    model.findOne.mockReturnValue(false);
    bcrypt.hash.mockReturnValue("DUMMY");
    bcrypt.genSalt.mockRejectedValue("hashing failed");
    await controller.createEmployee(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual("hashing failed");
  });
});
