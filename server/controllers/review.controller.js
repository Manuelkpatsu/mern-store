const Review = require('../models/review.model');
const Product = require('../models/product.model');

const createReview = async (req, res) => {
    try {
        const user = req.user;

        const review = new Review(Object.assign(req.body, { user: user._id }));

        const data = await review.save();

        res.status(200).json({
            success: true,
            message: 'Your review has been added successfully and will appear when approved!',
            review: data
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
            .populate({
                path: 'user',
                select: 'firstName'
            })
            .populate({
                path: 'product',
                select: 'name slug imageUrl'
            })
            .sort('-created');
    
        res.status(200).json({
            reviews
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const getReviewsForProduct = async (req, res) => {
    try {
        const productDoc = await Product.findOne({ slug: req.params.slug });
    
        if (!productDoc || (productDoc && productDoc?.brand?.isActive === false)) {
            return res.status(404).json({
                message: 'No reviews for this product.'
            });
        }
    
        const reviews = await Review.find({
                product: productDoc._id,
                status: 'Approved'
            })
            .populate({
                path: 'user',
                select: 'firstName'
            })
            .sort('-createdAt');
    
        res.status(200).json({
            reviews
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const update = req.body;
        const query = { _id: reviewId };
    
        await Review.findOneAndUpdate(query, update, {
            new: true
        });
    
        res.status(200).json({
            success: true,
            message: 'review has been updated successfully!'
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const approveReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
    
        const query = { _id: reviewId };
        const update = {
            status: 'Approved',
            isActive: true
        };
    
        await Review.findOneAndUpdate(query, update, {
            new: true
        });
    
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const rejectReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
    
        const query = { _id: reviewId };
        const update = {
            status: 'Rejected'
        };
    
        await Review.findOneAndUpdate(query, update, {
            new: true
        });
    
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const deleteReview = async (req, res) => {
    try {
        const review = await Review.deleteOne({ _id: req.params.id });
    
        res.status(200).json({
            success: true,
            message: `review has been deleted successfully!`,
            review
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

module.exports = {
    createReview,
    getReviews,
    getReviewsForProduct,
    updateReview,
    approveReview,
    rejectReview,
    deleteReview
}
