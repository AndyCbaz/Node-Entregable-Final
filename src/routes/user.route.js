const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controller');
const express = require('express');
const userRouter = express.Router();
const verifyJWT = require("../utils/verifyJWT")

userRouter.route('/')
    .get(verifyJWT,getAll)
    .post(create);

userRouter.route('/login')
    .post(login)

userRouter.route('/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = userRouter;