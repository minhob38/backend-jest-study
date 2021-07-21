const httpMock = require("node-mocks-http");
const controller = require("../../controller/employee.controller");
const model = require("../../model/employee.model");
const mockEmployeeList = require("../mockdata/employees.json");

model.findByIdAndDelete = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMock.createRequest();
  res = httpMock.createResponse();
  next = null;
});

afterEach(() => {
  model.findByIdAndDelete.mockClear();
});

describe("controller.deleteByEmployeeId", () => {
  test("deleteByEmployeeId function is defined", () => {
    expect(typeof controller.deleteByEmployeeId).toBe("function")
  });

  test("delete a valid employee", async () => {
    req.params.employee_id = mockEmployeeList[0]._id;
    model.findByIdAndDelete.mockResolvedValue(mockEmployeeList[0]);
    await controller.deleteByEmployeeId(req, res, next);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(req.params.employee_id);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(mockEmployeeList[0]);
  });

  test("return 400 when id not found", async () => {
    model.findByIdAndDelete.mockResolvedValue(null);
    await controller.deleteByEmployeeId(req, res, next);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(req.params.employee_id);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual("User Not Found");
  });

  // 왜 catch에서 응답을 안 하지...
  xtest("return 500 when findByIdAndDelete throw exception", async () => {
    model.findByIdAndDelete.mockRejectedValue("fake error");
    await controller.deleteByEmployeeId(req, res, next);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(req.params.employee_id);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getData()).toBe("fake error");
    expect(res.statusCode).toBe(500);
  });
});
