const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: () => {
            return this.provider !== 'email' ? false : true;
        }
    },
    phoneNumber: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
        default: null
    },
    provider: {
        type: String,
        required: true,
        default: 'email'
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: 'ROLE_MEMBER',
        enum: ['ROLE_MEMBER', 'ROLE_ADMIN', 'ROLE_MERCHANT']
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
