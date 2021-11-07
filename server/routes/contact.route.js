const express = require('express');
const router = express.Router();

const sendMessage = require('../controllers/contact.controller');

router.post('/add', sendMessage);

module.exports = router;
