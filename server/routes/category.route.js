const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
    addCategory,
    getCategories,
    getStoreCategories,
    getCategoryById,
    updateCategory,
    disableOrEnableCategoryProducts,
    deleteCategory
} = require('../controllers/category.controller');

router.post(
    '/add',
    auth,
    role.checkRole(role.ROLES.Admin),
    addCategory
);

router.get('/list', getStoreCategories);

router.get('/', getCategories);

router.get('/:id', getCategoryById);

router.put(
    '/:id',
    auth,
    role.checkRole(role.ROLES.Admin),
    updateCategory
);

router.put(
    '/:id/active',
    auth,
    role.checkRole(role.ROLES.Admin),
    disableOrEnableCategoryProducts
);

router.delete(
    '/delete/:id',
    auth,
    role.checkRole(role.ROLES.Admin),
    deleteCategory
);

module.exports = router;
