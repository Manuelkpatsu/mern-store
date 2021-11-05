const mongoose = require('mongoose')

const cartItemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number,
    purchasePrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    priceWithTax: {
        type: Number,
        default: 0
    },
    totalTax: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Not processed',
        enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    }
});

module.exports = mongoose.model('CartItem', cartItemSchema);

const cartSchema = mongoose.Schema({
    products: [CartItemSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
