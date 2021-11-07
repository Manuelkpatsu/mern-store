const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
    createBrand,
    getAllStoreBrands,
    getAllBrands,
    getBrandById,
    updateBrand,
    activateAndDisableBrand,
    selectListOfBrands,
    deleteBrand
} = require('../controllers/brand.controller');

router.post('/add', auth, role.checkRole(role.ROLES.Admin), createBrand);

router.get('/list', getAllStoreBrands);

router.get(
    '/',
    auth,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    getAllBrands
);

router.get('/:id', getBrandById);

router.get(
    '/list/select', 
    auth, 
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    selectListOfBrands
);

router.put(
    '/:id',
    auth,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    updateBrand
);

router.put(
    '/:id/active',
    auth,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    activateAndDisableBrand
);

router.delete(
    '/delete/:id',
    auth,
    role.checkRole(role.ROLES.Admin),
    deleteBrand
);

module.exports = router;
