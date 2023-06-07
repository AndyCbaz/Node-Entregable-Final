const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");
//variables globales
let token;
let cartId;

//token
beforeAll(async () => {
  const credentials = {
    email: "testuser@gmail.com",
    password: "1234",
  };
  const userLogged = await request(app).post("/users/login").send(credentials);
  token = userLogged.body.token;
});

//test para crear un carrito
test("POST /carts should create a cart", async () => {
  const newProduct = await Product.create({
    title: "title false",
    description: "description false",
    brand: "brand false",
    price: "price false",
  });
  const newCart = {
    productId: newProduct.id,
    quantity: 4,
  };
  const resCreate = await request(app)
    .post("/carts")
    .send(newCart)
    .set("Authorization", `Bearer ${token}`);
  await newProduct.destroy();
  cartId = resCreate.body.id;
  expect(resCreate.status).toBe(201);
  expect(resCreate.body.id).toBeDefined();
});

//test para ver los carritos
test("GET /carts", async () => {
  const resGetAll = await request(app)
    .get("/carts")
    .set("Authorization", `Bearer ${token}`);
  expect(resGetAll.status).toBe(200);
});

//test para actualizar el carrito
test("PUT /carts/:id", async () => {
  const cartUpdated = {
    quantity: 2,
  };
  const resPut = await request(app)
    .put(`/carts/${cartId}`)
    .send(cartUpdated)
    .set("Authorization", `Bearer ${token}`);
  expect(resPut.status).toBe(200);
  expect(resPut.body.quantity).toBe(cartUpdated.quantity);
});

//test para obtener un carrito
test("GET /carts/:id", async () => {
  const resGetOne = await request(app)
    .get(`/carts/${cartId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(resGetOne.status).toBe(200);
  expect(resGetOne.body.id).toBeDefined()
});


//test para borrar carrito
test('DELETE /carts/:id', async () => { 
    const resDelete = await request(app).delete(`/carts/${cartId}`).set("Authorization", `Bearer ${token}`);
    expect(resDelete.status).toBe(204)
 })