const crypto = require('crypto');

const Merchant = require('../models/merchant.model');
const User = require('../models/user.model');
const Brand = require('../models/brand.model');
const role = require('../middleware/role');
const mailgun = require('../services/mailgun');

const sellerRequest = async (req, res) => {
    try {
        const { name, business, phoneNumber, email, brand } = req.body;

        if (!name || !email) {
            return res
                .status(400)
                .json({ error: 'You must enter your name and email.' });
        }
      
        if (!business) {
            return res
                .status(400)
                .json({ error: 'You must enter a business description.' });
        }
      
        if (!phoneNumber || !email) {
            return res
                .status(400)
                .json({ error: 'You must enter a phone number and an email address.' });
        }

        const existingMerchant = await Merchant.findOne({ email });

        if (existingMerchant) {
            return res
                .status(400)
                .json({ error: 'That email address is already in use.' });
        }

        const merchant = new Merchant({
            name,
            email,
            business,
            phoneNumber,
            brand
        });
      
        const merchantDoc = await merchant.save();
      
        await mailgun.sendEmail(email, 'merchant-application');

        res.status(200).json({
            success: true,
            message: `We received your request! we will reach you on your phone number ${phoneNumber}!`,
            merchant: merchantDoc
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const getAllMerchants = async (req, res) => {
    try {
        const merchants = await Merchant.find({}).sort('-created');
  
        res.status(200).json({
            merchants
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const approveMerchant = async (req, res) => {
    try {
        const merchantId = req.params.merchantId;
    
        const query = { _id: merchantId };
        const update = {
            status: 'Approved',
            isActive: true
        };
    
        const merchantDoc = await Merchant.findOneAndUpdate(query, update, {
            new: true
        });
    
        await createMerchantUser(
            merchantDoc.email,
            merchantDoc.name,
            merchantId,
            req.headers.host
        );
    
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const rejectMerchant = async (req, res) => {
    try {
        const merchantId = req.params.merchantId;
    
        const query = { _id: merchantId };
        const update = {
            status: 'Rejected'
        };
    
        await Merchant.findOneAndUpdate(query, update, {
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

const merchantSignup = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;
    
        if (!email) {
            return res
                .status(400)
                .json({ error: 'You must enter an email address.' });
        }
    
        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'You must enter your full name.' });
        }
    
        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }
    
        const userDoc = await User.findOne({
            email,
            resetPasswordToken: req.params.token
        });
    
        const hashedPassword = await User.hashPassword(password);
    
        const query = { _id: userDoc._id };
        const update = {
            email,
            firstName,
            lastName,
            password: hashedPassword,
            resetPasswordToken: undefined
        };
    
        await User.findOneAndUpdate(query, update, {
            new: true
        });
    
        const merchantDoc = await Merchant.findOne({
            email
        });
    
        await createMerchantBrand(merchantDoc);
    
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const removeMerchant = async (req, res) => {
    try {
        const merchant = await Merchant.deleteOne({ _id: req.params.id });
  
        res.status(200).json({
            success: true,
            message: 'Merchant has been deleted successfully!',
            merchant
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const createMerchantBrand = async ({ _id, brand, business }) => {
    const newBrand = new Brand({
        name: brand,
        description: business,
        merchant: _id,
        isActive: false
    });

    return await newBrand.save();
}

const createMerchantUser = async (email, name, merchant, host) => {
    const firstName = name;
    const lastName = '';

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const query = { _id: existingUser._id };
        const update = {
            merchant,
            role: role.ROLES.Merchant
        };

        const merchantDoc = await Merchant.findOne({
            email
        });

        await createMerchantBrand(merchantDoc);

        await mailgun.sendEmail(email, 'merchant-welcome', null, name);

        return await User.findOneAndUpdate(query, update, {
            new: true
        });
    } else {
        const buffer = await crypto.randomBytes(48);
        const resetToken = buffer.toString('hex');
        const resetPasswordToken = resetToken;

        const user = new User({
            email,
            firstName,
            lastName,
            resetPasswordToken,
            merchant,
            role: role.ROLES.Merchant
        });

        await mailgun.sendEmail(email, 'merchant-signup', host, {
            resetToken,
            email
        });
      
        return await user.save();
    }
}

module.exports = {
    sellerRequest,
    merchantSignup,
    getAllMerchants,
    approveMerchant,
    rejectMerchant,
    removeMerchant
}
