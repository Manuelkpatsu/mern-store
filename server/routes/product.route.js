const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
    getProductBySlug,
    searchProductByName,
    getStoreProductsByFilters,
    getStoreProductsByBrand,
    selectProducts,
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    activateProduct,
    deleteProduct
} = require('../controllers/product.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/item/:slug', getProductBySlug);

router.get('/list/search/:name', searchProductByName);

router.post('/list', getStoreProductsByFilters);

router.get('/list/brand/:slug', getStoreProductsByBrand);

router.get('/list/select', auth, selectProducts);

router.post(
    '/add',
    auth,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    upload.single('image'),
    addProduct
);

router.get(
    '/',
    auth,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    getProducts
);

router.get(
    '/:id',
    auth,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    getProduct
);

router.put(
    '/:id',
    auth,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    updateProduct
);

router.put(
    '/:id/active',
    auth,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    activateProduct
);

router.delete(
    '/delete/:id',
    auth,
    role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
    deleteProduct
);

module.exports = router;
