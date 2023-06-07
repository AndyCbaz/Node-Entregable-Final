const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');
const { raw } = require('express');

const getAll = catchError(async(req, res) => {
    const resGetAll = await Purchase.findAll({
        include: [Product, User],
        where: {userId: req.user.id}
    })
    return res.json(resGetAll)
});

const buyCart = catchError(async(req,res)=> {
    Purchase.destroy({where: {userId: req.user.id}})
    const cartProducts = await Cart.findAll({
        where: {userId: req.user.id},
        attributes: ["userId", "productId", "quantity"],
        raw:true
    })
    await Purchase.bulkCreate(cartProducts)
    await Cart.destroy({where: {userId: req.user.id}})
    return res.json(cartProducts)
})

module.exports = {
    getAll,
    buyCart
}