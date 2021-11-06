const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log("Hashing failed", error);
    }
}

module.exports.comparePasswords = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
        console.log("Comparison failed", error);
    }
}
