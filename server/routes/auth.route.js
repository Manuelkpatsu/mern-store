const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    authUser,
    registerUser,
    forgotPassword,
    resetPasswordWithToken,
    resetPassword,
    googleCallback,
    facebookCallback
} = require('../controllers/auth.controller');

router.post('/login', authUser);

router.post('/register', registerUser);

router.post('/forgot', forgotPassword);

router.post('/reset/:token', resetPasswordWithToken);

router.post('/reset', resetPassword);

router.get(
    '/google',
    passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email'],
        accessType: 'offline',
        approvalPrompt: 'force'
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }),
    googleCallback
);

router.get(
    '/facebook',
    passport.authenticate('facebook', {
        session: false,
        scope: ['public_profile', 'email']
    })
);

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/',
        session: false
    }),
    facebookCallback
);

module.exports = router;
