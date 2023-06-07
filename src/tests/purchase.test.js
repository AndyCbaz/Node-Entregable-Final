const request = require("supertest");
const app = require("../app");
require("../models");

//variables globales
let token;

//token
beforeAll(async () => {
  const credentials = {
    email: "testuser@gmail.com",
    password: "1234",
  };
  const userLogged = await request(app).post("/users/login").send(credentials);
  token = userLogged.body.token;
});

//test para obtener los purchases
test("GET /purchases", async () => {
  const resGetAll = await request(app)
    .get("/purchases")
    .set("Authorization", `Bearer ${token}`);
  expect(resGetAll.status).toBe(200);
});
