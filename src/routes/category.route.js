const { getAll, create, remove, update, getOne } = require('../controllers/category.controler');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT")

const categoryRoute = express.Router();

categoryRoute.route('/')
    .get(getAll)
    .post(verifyJWT,create);

categoryRoute.route('/:id')
    .get(getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = categoryRoute;