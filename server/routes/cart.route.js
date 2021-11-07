const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const {
    addProductsToCart,
    deleteCartItem,
    addProductToCartItem,
    removeProductFromCart
} = require('../controllers/cart.controller');

router.post('/add', auth, addProductsToCart);

router.delete('/delete/:cartId', auth, deleteCartItem);

router.post('/add/:cartId', auth, addProductToCartItem);

router.delete('/delete/:cartId/:productId', auth, removeProductFromCart);

module.exports = router;
