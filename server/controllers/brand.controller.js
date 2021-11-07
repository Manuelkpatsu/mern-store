const Brand = require('../models/brand.model');
const Product = require('../models/product.model');

const store = require('../utils/store');

const createBrand = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;

        if (!description || !name) {
            return res
              .status(400)
              .json({ error: 'You must enter description & name.' });
        }
    
        const brand = new Brand({
            name,
            description,
            isActive
        });
    
        const brandDoc = await brand.save();

        res.status(201).json({
            success: true,
            message: 'Brand has been added successfully!',
            brand: brandDoc
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const getAllStoreBrands = async (req, res) => {
    try {
        const brands = await Brand.find({
            isActive: true
        }).populate('merchant', 'name');

        res.status(200).json({
            brands
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const getAllBrands = async (req, res) => {
    try {
        let brands = null;

        if (req.user.merchant) {
            brands = await Brand.find({
                merchant: req.user.merchant
            }).populate('merchant', 'name');
        } else {
            brands = await Brand.find({}).populate('merchant', 'name');
        }
    
        res.status(200).json({
            brands
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const getBrandById = async (req, res) => {
    try {
        const brandId = req.params.id;

        const brandDoc = await Brand.findOne({ _id: brandId });

        if (!brandDoc) {
            res.status(404).json({
              message: `Cannot find brand with the id: ${brandId}.`
            });
        }

        res.status(200).json({
            brand: brandDoc
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const selectListOfBrands = async (req, res) => {
    try {
        let brands = null;

        if (req.user.merchant) {
            brands = await Brand.find(
                {
                    merchant: req.user.merchant
                },
                'name'
            );
        } else {
            brands = await Brand.find({}, 'name');
        }
    
        res.status(200).json({
            brands
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const updateBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const update = req.body.brand;
        const query = { _id: brandId };

        await Brand.findOneAndUpdate(query, update, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: 'Brand has been updated successfully!'
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const activateAndDisableBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const update = req.body.brand;
        const query = { _id: brandId };

        // disable brand(brandId) products
        if (!update.isActive) {
            const products = await Product.find({ brand: brandId });
            store.disableProducts(products);
        }

        await Brand.findOneAndUpdate(query, update, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: 'Brand has been updated successfully!'
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.deleteOne({ _id: req.params.id });
  
        res.status(200).json({
            success: true,
            message: `Brand has been deleted successfully!`,
            brand
        });
      } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

module.exports = {
    createBrand,
    getAllStoreBrands,
    getAllBrands,
    getBrandById,
    updateBrand,
    activateAndDisableBrand,
    selectListOfBrands,
    deleteBrand
}
