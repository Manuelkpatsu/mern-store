const mongoose = require('mongoose');

const merchantSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    brand: {
        type: String
    },
    business: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'Waiting Approval',
        enum: ['Waiting Approval', 'Rejected', 'Approved']
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Merchant', merchantSchema);
