const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {
    createReview,
    getReviews,
    getReviewsForProduct,
    updateReview,
    approveReview,
    rejectReview,
    deleteReview
} = require('../controllers/review.controller');

router.post('/add', auth, createReview);

router.get('/', getReviews);

router.get('/:slug', getReviewsForProduct);

router.put('/:id', updateReview);

router.put('/approve/:reviewId', auth, approveReview);

router.put('/reject/:reviewId', auth, rejectReview);

router.delete('/delete/:id', deleteReview);

module.exports = router;
