const request = require("supertest");
const app = require("../app");
require('../models')
let token;
let categorieId;

//token
beforeAll(async () => {
  const credentials = {
    email: "testuser@gmail.com",
    password: "1234",
  };
  const userLogged = await request(app).post("/users/login").send(credentials);
  token = userLogged.body.token;
});

//test para crear una categoria
test("POST /categories", async () => {
  const category = {
    name: "SmartTv",
  };
  const resPostCreate = await request(app)
    .post("/categories")
    .send(category)
    .set("Authorization", `Bearer ${token}`);
  categorieId = resPostCreate.body.id;
  expect(resPostCreate.status).toBe(201);
});

//test para pbtener las categorias creadas
test("GET /categories", async () => {
  const resGetAll = await request(app).get("/categories");
  // console.log(resGetAll.body)
  expect(resGetAll.status).toBe(200);
  expect(resGetAll.body).toHaveLength(1);
});

//test para actualizar una categoria
test("PUT /categories/:id", async () => {
  const categorieUpdated = {
    name: "Plasma",
  };
  const resPut = await request(app)
    .put(`/categories/${categorieId}`)
    .send(categorieUpdated)
    .set("Authorization", `Bearer ${token}`);
  expect(resPut.status).toBe(200);
  expect(resPut.body.name).toBe(categorieUpdated.name);
});

//test para borrar una categoria

test("DELETE /categories/:id", async () => {
  const resDelete = await request(app)
    .delete(`/categories/${categorieId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(resDelete.status).toBe(204);
});
