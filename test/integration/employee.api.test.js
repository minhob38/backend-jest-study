const request = require("supertest");
const app = require("../../app");
const mongodb = require("../../mongodb/mongodb.utils");
const endpointUrl = "/api";

describe("Vaildate" + endpointUrl, () => {
  test("Get /", async () => {
    const response = await request(app)
      .get("/");
    expect(response.body).toBe("hello from employee app");
    expect(response.statusCode).toBe(200);
  });
  test("Get /" + endpointUrl, async () => {
    const response = await request(app)
      .get(endpointUrl);
      expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      status: "API is working",
      message: "Welcome to the employee api router, here we define all functions"
    });
    expect(response.body).toHaveProperty("status", "API is working");
    expect(response.body).toMatchObject({
      status: "API is working",
      message: "Welcome to the employee api router, here we define all functions"
    });
    expect(JSON.stringify(response.body)).toEqual(JSON.stringify({
      status: "API is working",
      message: "Welcome to the employee api router, here we define all functions"
    }));
  });
})