const request = require("supertest");
const app = require("../app");
//variables globales
let userId;
let token;

//test para crear usuario
test("POST /users", async () => {
  const bodyPostCreate = {
    firstName: "Andrés",
    lastName: "Bonilla",
    email: "andy.cbr.ab@gmail.com",
    password: "12345",
    phone: "+593982292529",
  };
  const resPostCreate = await request(app).post("/users").send(bodyPostCreate);
  userId = resPostCreate.body.id;
  expect(resPostCreate.status).toBe(201);
  expect(resPostCreate.body.id).toBeDefined();
});
//test de login con credenciales correctas
test("POST /users/login should do login", async () => {
  const loginCredentials = {
    email: "andy.cbr.ab@gmail.com",
    password: "12345",
  };
  const resLogin = await request(app)
    .post("/users/login")
    .send(loginCredentials);
  token = resLogin.body.token;
  expect(resLogin.status).toBe(200);
  expect(resLogin.body.token).toBeDefined();
});
//test de login con credenciales incorrectas
test("POST /users/login with invalid credentials", async () => {
  const loginCredentials = {
    email: "andy.cbr.ab@gmail.com",
    password: "123456",
  };
  const resLogin = await request(app)
    .post("/users/login")
    .send(loginCredentials);
  expect(resLogin.status).toBe(401);
});


//test de get para obtener todos los usuarios
test("GET /users", async () => {
  const resGet = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(resGet.status).toBe(200);
  expect(resGet.body).toHaveLength(2);
});


//test para actualizar los usuarios
test("PUT /users/:id", async () => {
  const userUpdate = {
    firstName: "Andresito",
  };
  const resPut = await request(app).put(`/users/${userId}`).send(userUpdate).set("Authorization", `Bearer ${token}`);
  expect(resPut.status).toBe(200);
  expect(resPut.body.firstName).toBe(userUpdate.firstName);
});

//test para borrar usuarios

test("DELETE /users/:id", async () => {
  const resDelete = await request(app).delete(`/users/${userId}`).set("Authorization", `Bearer ${token}`);
  expect(resDelete.status).toBe(204);
});
