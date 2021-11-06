const Category = require('../models/category.model');

const store = require('../utils/store');

const addCategory = async (req, res) => {
    try {
        const { name, description, products, isActive } = req.body;

        if (!description || !name) {
            return res
                .status(400)
                .json({ error: 'You must enter description & name.' });
        }

        const category = new Category({
            name,
            description,
            products,
            isActive
        });

        const data = await category.save();

        res.status(201).json({
            success: true,
            message: 'Category has been added successfully!',
            category: data
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const getStoreCategories = async (req, res) => {
    try {
        const data = await Category.find({ isActive: true });

        res.status(200).json({
            categories: data
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});

        res.status(200).json({
            categories
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
    
        const categoryDoc = await Category.findOne({ _id: categoryId }).populate({
            path: 'products',
            select: 'name'
        });
    
        if (!categoryDoc) {
            return res.status(404).json({
                message: 'No Category found.'
            });
        }
    
        res.status(200).json({
            category: categoryDoc
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const update = req.body.category;
        const query = { _id: categoryId };
    
        await Category.findOneAndUpdate(query, update, {
            new: true
        });
    
        res.status(200).json({
            success: true,
            message: 'Category has been updated successfully!'
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const disableOrEnableCategoryProducts = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const update = req.body.category;
        const query = { _id: categoryId };
  
        // disable category(categoryId) products
        if (!update.isActive) {
            const categoryDoc = await Category.findOne(
                { _id: categoryId, isActive: true },
                'products -_id'
            ).populate('products');
    
            store.disableProducts(categoryDoc.products);
        }
  
        await Category.findOneAndUpdate(query, update, {
            new: true
        });
  
        res.status(200).json({
            success: true,
            message: 'Category has been updated successfully!'
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const product = await Category.deleteOne({ _id: req.params.id });
  
        res.status(200).json({
            success: true,
            message: `Category has been deleted successfully!`,
            product
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

module.exports = {
    addCategory,
    getCategories,
    getStoreCategories,
    getCategoryById,
    updateCategory,
    disableOrEnableCategoryProducts,
    deleteCategory
}
