const express = require('express');
const userRouter = require('./user.route');
const categoryRoute = require('./category.route');
const productRouter = require('./product.router');
const productImgRouter = require('./productImg.router');
const cartRouter = require('./cart.router');
const purchaseRouter = require('./purchase.router');
const router = express.Router();

// colocar las rutas aquí
router.use("/users",userRouter)
router.use("/categories",categoryRoute)
router.use("/products", productRouter)
router.use("/products_images", productImgRouter)
router.use("/cart",cartRouter)
router.use("/purchases", purchaseRouter)

module.exports = router;