const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
    sellerRequest,
    merchantSignup,
    getAllMerchants,
    approveMerchant,
    rejectMerchant,
    removeMerchant
} = require('../controllers/merchant.controller');

router.post('/seller-request', sellerRequest);

router.get(
    '/list',
    auth,
    role.checkRole(role.ROLES.Admin),
    getAllMerchants
);

router.put('/approve/:merchantId', auth, approveMerchant);

router.put('/reject/:merchantId', auth, rejectMerchant);

router.post('/signup/:token', merchantSignup);

router.delete(
    '/delete/:id',
    auth,
    role.checkRole(role.ROLES.Admin),
    removeMerchant
);

module.exports = router;
