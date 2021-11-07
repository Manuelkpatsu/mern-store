const router = require('express').Router();

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const addressRoutes = require('./address.route');
const newsletterRoutes = require('./newsletter.route');
const productRoutes = require('./product.route');
const categoryRoutes = require('./category.route');
const brandRoutes = require('./brand.route');
const contactRoutes = require('./contact.route');
const merchantRoutes = require('./merchant.route');
const cartRoutes = require('./cart.route');
const orderRoutes = require('./order.route');
const reviewRoutes = require('./review.route');
const wishlistRoutes = require('./wishlist.route');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// address routes
router.use('/address', addressRoutes);

// newsletter routes
router.use('/newsletter', newsletterRoutes);

// product routes
router.use('/product', productRoutes);

// category routes
router.use('/category', categoryRoutes);

// brand routes
router.use('/brand', brandRoutes);

// contact routes
router.use('/contact', contactRoutes);

// merchant routes
router.use('/merchant', merchantRoutes);

// cart routes
router.use('/cart', cartRoutes);

// order routes
router.use('/order', orderRoutes);

// Review routes
router.use('/review', reviewRoutes);

// Wishlist routes
router.use('/wishlist', wishlistRoutes);

module.exports = router;
