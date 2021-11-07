const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {
    createAddress,
    getAddressById,
    getAllAddresses,
    updateAddress,
    deleteAddress
} = require('../controllers/address.controller');

router.post('/add', auth, createAddress);

router.get('/', auth, getAllAddresses);

router.get('/:id', auth, getAddressById);

router.put('/:id', updateAddress);

router.delete('/delete/:id', deleteAddress);

module.exports = router;
