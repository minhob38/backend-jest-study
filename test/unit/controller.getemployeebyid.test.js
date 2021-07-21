const controller = require("../../controller/employee.controller");
const model = require("../../model/employee.model");

describe("controller.getEmployeeById", () => {
  test("getEmployeeById function is defined", () => {
    expect(typeof controller.getEmployeeById).toBe("function")
  });
})