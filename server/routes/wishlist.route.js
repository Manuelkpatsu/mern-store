const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { 
    addItemToWishlist,
    getWishlist
} = require('../controllers/wishlist.controller');

router.post('/', auth, addItemToWishlist);

router.get('/', auth, getWishlist);

module.exports = router;
