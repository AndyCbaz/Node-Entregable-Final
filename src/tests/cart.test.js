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
test("POST /cart should create a cart", async () => {
  const newProduct = await Product.create({
    title: "title false",
    description: "description false",
    brand: "brand false",
    price: 10,
  });
  const newCart = {
    productId: newProduct.id,
    quantity: 4,
  };
  const resCreate = await request(app)
    .post("/cart")
    .send(newCart)
    .set("Authorization", `Bearer ${token}`);
  await newProduct.destroy();
  cartId = resCreate.body.id;
  expect(resCreate.status).toBe(201);
  expect(resCreate.body.id).toBeDefined();
});

//test para ver los carritos
test("GET /cart", async () => {
  const resGetAll = await request(app)
    .get("/cart")
    .set("Authorization", `Bearer ${token}`);
  expect(resGetAll.status).toBe(200);
});

//test para actualizar el carrito
test("PUT /cart/:id", async () => {
  const cartUpdated = {
    quantity: 2,
  };
  const resPut = await request(app)
    .put(`/cart/${cartId}`)
    .send(cartUpdated)
    .set("Authorization", `Bearer ${token}`);
  expect(resPut.status).toBe(200);
  expect(resPut.body.quantity).toBe(cartUpdated.quantity);
});

//test para obtener un carrito
test("GET /cart/:id", async () => {
  const resGetOne = await request(app)
    .get(`/cart/${cartId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(resGetOne.status).toBe(200);
  expect(resGetOne.body.id).toBeDefined()
});


//test para borrar carrito
test('DELETE /cart/:id', async () => { 
    const resDelete = await request(app).delete(`/cart/${cartId}`).set("Authorization", `Bearer ${token}`);
    expect(resDelete.status).toBe(204)
 })