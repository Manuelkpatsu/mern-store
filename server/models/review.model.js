const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    title: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        trim: true
    },
    isRecommended: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        default: 'Waiting Approval',
        enum: ['Waiting Approval', 'Rejected', 'Approved']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
