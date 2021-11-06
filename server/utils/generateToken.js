const jwt = require('jsonwebtoken')

const keys = require('../config/keys');

const { secret, tokenLife } = keys.jwt;

const generateToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: tokenLife,
    })
}

module.exports = generateToken
