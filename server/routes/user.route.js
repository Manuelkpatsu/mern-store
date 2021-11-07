const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
    searchUsers,
    getUser,
    updateProfile
} = require('../controllers/user.controller');

router.get(
    '/search',
    auth,
    role.checkRole(role.ROLES.Admin),
    searchUsers
);

router.get('/', auth, getUser);

router.put('/', auth, updateProfile);

module.exports = router;
