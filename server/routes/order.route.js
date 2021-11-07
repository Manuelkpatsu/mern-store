const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {
    addOrder,
    searchOrders,
    getAllOrders,
    getOrder,
    cancelOrder,
    updateOrderStatus
} = require('../controllers/order.controller');

router.post('/add', auth, addOrder);

router.get('/search', auth, searchOrders);

router.get('/', auth, getAllOrders);

router.get('/:orderId', auth, getOrder);

router.delete('/cancel/:orderId', auth, cancelOrder);

router.put('/status/item/:itemId', auth, updateOrderStatus);

module.exports = router;
