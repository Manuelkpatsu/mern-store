const Address = require('../models/address.model');

// @desc    Create a new address
// @route   POST /api/address/add
// @access  Private
const createAddress = (req, res) => {
    const user = req.user;

    const address = Address(Object.assign(req.body, { user: user._id }));

    address.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
            });
        }

        res.status(201).json({
            success: true,
            message: `Address has been added successfully!`,
            address: data
        });
    });
}

// @desc    Get all addresses
// @route   GET /api/address
// @access  Private
const getAllAddresses = (req, res) => {
    Address.find({ user: req.user._id }, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
            });
        }

        res.status(200).json({
            addresses: data
        });
    });
}

// @desc    Get address by ID
// @route   GET /api/address/:id
// @access  Private
const getAddressById = async (req, res) => {
    try {
        const addressId = req.params.id;

        const addressDoc = await Address.findOne({ _id: addressId });

        if (!addressDoc) {
            res.status(404).json({
                message: `Cannot find Address with the id: ${addressId}.`
            });
        }
      
        res.status(200).json({
            address: addressDoc
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

// @desc    Update an address
// @route   PUT /api/address/:id
// @access  Private
const updateAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        const update = req.body;
        const query = { _id: addressId };

        await Address.findOneAndUpdate(query, update, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: 'Address has been updated successfully!'
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

// @desc    Delete an address
// @route   DELETE /api/address/delete/:id
// @access  Private
const deleteAddress = (req, res) => {
    Address.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
            });
        }

        res.status(200).json({
            success: true,
            message: `Address has been deleted successfully!`,
            address: data
        });
    });
}

module.exports = {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress
}
