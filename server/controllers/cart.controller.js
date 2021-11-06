const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const store = require('../utils/store');

const addProductsToCart = async (req, res) => {
    try {
        const user = req.user._id;
        const items = req.body.products;

        const products = store.calculateItemsSalesTax(items);

        const cart = new Cart({
            user,
            products
        });
      
        const cartDoc = await cart.save();
      
        decreaseQuantity(products);
      
        res.status(200).json({
            success: true,
            cartId: cartDoc.id
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const deleteCartItem = async (req, res) => {
    try {
        await Cart.deleteOne({ _id: req.params.cartId });
    
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const addProductToCartItem = async (req, res) => {
    try {
        const product = req.body.product;
        const query = { _id: req.params.cartId };
    
        await Cart.updateOne(query, { $push: { products: product } }).exec();
    
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const removeProductFromCart = async (req, res) => {
    try {
        const product = { product: req.params.productId };
        const query = { _id: req.params.cartId };
    
        await Cart.updateOne(query, { $pull: { products: product } }).exec();
    
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const decreaseQuantity = products => {
    let bulkOptions = products.map(item => {
        return {
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity } }
            }
        };
    });

    Product.bulkWrite(bulkOptions);
}

module.exports = {
    addProductsToCart,
    deleteCartItem,
    addProductToCartItem,
    removeProductFromCart
}
