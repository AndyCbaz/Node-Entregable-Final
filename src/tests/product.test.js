const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const ProductImg = require("../models/ProductImg");
require('../models')

//variables globales
let productId;
let token;
//funciones anticipadas
beforeAll(async () => {
  const credentials = {
    email: "testuser@gmail.com",
    password: "1234",
  };
  const userLogged = await request(app).post("/users/login").send(credentials);
  token = userLogged.body.token;
});

// // test crear un producto
test("POST /products", async () => {
  const category = await Category.create({
    name: "accesories",
  });
  const newProduct = {
    title: "Huawei p40 Lite",
    description:
      "Telefono movile de gama media con gran rendimiento de bateria y carga rapida ademas de tener 128GB de almacenamiento",
    brand: "Huawei",
    price: 400,
    categoryId: category.id,
  };
  const resPostCreate = await request(app)
    .post("/products")
    .send(newProduct)
    .set("Authorization", `Bearer ${token}`);
  await category.destroy();

  productId = resPostCreate.body.id;

  expect(resPostCreate.status).toBe(201);
  expect(resPostCreate.body.id).toBeDefined();
});

//test para obtener todos los productos
test('GET /products', async () => { 
  const resGetAll = await request(app).get('/products')
  expect(resGetAll.status).toBe(200)
 })

//test para agregar una imagen
test('POST /products/:id/images should set the products images', async () => { 
  const image = await ProductImg.create({
    url: "http://falseurl.com",
    publicId: "false id"
  })
  const resPostImg = await request(app)
  .post(`/products/${productId}/images`)
  .send([image.id])
  .set("Authorization", `Bearer ${token}`);
  await image.destroy()
  expect(resPostImg.status).toBe(200)
  expect(resPostImg.body).toHaveLength(1)
 })

//test para actualizar un producto
test("PUT /products/:id", async () => {
  const productsUpdated = {
    price: 450,
  };
  const resPut = await request(app)
    .put(`/products/${productId}`)
    .send(productsUpdated)
    .set("Authorization", `Bearer ${token}`);

  expect(resPut.status).toBe(200);
  expect(resPut.body.price).toBe(productsUpdated.price);
});


//test para borrar un producto
test("DELETE /products/:id", async () => {
  const resDelete = await request(app)
    .delete(`/products/${productId}`)
    .set("Authorization", `Bearer ${token}`);
    expect(resDelete.status).toBe(204)
});

