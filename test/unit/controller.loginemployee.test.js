const httpMock = require("node-mocks-http");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const controller = require("../../controller/employee.controller");
const model = require("../../model/employee.model");
const mockEmployee = require("../mockdata/employeeReqPayload.json");

model.create = jest.fn();
model.findOne = jest.fn();
bcrypt.compare = jest.fn();
jwt.sign = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMock.createRequest();
  res = httpMock.createResponse();
  next = null;
  req.body = { ...mockEmployee }
});

afterEach(() => {
  model.create.mockClear();
  model.findOne.mockClear();
  bcrypt.compare.mockClear();
  jwt.sign.mockClear();
});

describe("controller.loginEmployee", () => {
  test("createEmployee function is defined", ()  => {
    expect(typeof controller.loginEmployee).toBe("function")
  });

  test("login from a valid employee", async () => {
    model.findOne.mockReturnValue(mockEmployee);
    bcrypt.compare.mockReturnValue(true);
    jwt.sign.mockReturnValue("fakejwttoken");
    await controller.loginEmployee(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual(mockEmployee);
    expect(res._getHeaders()["auth-token"]).toStrictEqual("fakejwttoken");
  });

  test("login from a valid employee but jwt sign fails", async () => {
    model.findOne.mockReturnValue(mockEmployee);
    bcrypt.compare.mockReturnValue(true);
    jwt.sign.mockRejectedValue("fake jwt sign exception");
    await controller.loginEmployee(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual("fake jwt sign exception");
    expect(res._getHeaders()["auth-token"]).toBeUndefined;
  });
});
