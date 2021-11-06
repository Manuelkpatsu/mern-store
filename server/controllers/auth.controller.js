const crypto = require('crypto');

const User = require('../models/user.model');
const mailchimp = require('../services/mailchimp');
const mailgun = require('../services/mailgun');
const generateToken = require('../utils/generateToken');

const authUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'You must enter an email address.' });
    }
    
    if (!password) {
        return res.status(400).json({ error: 'You must enter a password.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res
            .status(400)
            .send({ error: 'No user found for this email address.' });
    }

    const isValid = await User.comparePasswords(password, user.password);

    if (isValid) {
        res.status(200).json({
            success: true,
            token: `Bearer ${generateToken(user._id)}`,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } else {
        res.status(400).json({
            success: false,
            error: 'Password Incorrect'
        });
    }
}

const registerUser = async (req, res) => {
    try {
        const { email, firstName, lastName, password, isSubscribed } = req.body;

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

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ error: 'That email address is already in use.' });
        }

        let subscribed = false;
        if (isSubscribed) {
            const result = await mailchimp.subscribeToNewsletter(email);
    
            if (result.status === 'subscribed') {
                subscribed = true;
            }
        }

        const user = new User({
            email,
            password,
            firstName,
            lastName
        });

        const hashedPassword = User.hashPassword(password);

        user.password = hashedPassword;
        const registeredUser = await user.save();

        await mailgun.sendEmail(
            registeredUser.email,
            'signup',
            null,
            registeredUser.profile
        );

        res.status(201).json({
            success: true,
            subscribed,
            token: `Bearer ${generateToken(registeredUser._id)}`,
            user: {
                id: registeredUser._id,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email,
                role: registeredUser.role
            }
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'You must enter an email address.' });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                error: 'Sorry, this user does not exist.'
            });
        }

        const buffer = await crypto.randomBytes(48);
        const resetToken = buffer.toString('hex');

        existingUser.resetPasswordToken = resetToken;
        existingUser.resetPasswordExpires = Date.now() + 3600000;

        await existingUser.save();

        await mailgun.sendEmail(
            existingUser.email,
            'reset',
            req.headers.host,
            resetToken
        );

        res.status(200).json({
            success: true,
            message:
              'Please check your email for the link to reset your password.'
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const resetPasswordWithToken = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const resetUser = User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!resetUser) {
            return res.status(400).json({
              error:
                'Your token has expired. Please attempt to reset your password again.'
            });
        }

        const hashedPassword = await User.hashPassword(password);
        resetUser.password = hashedPassword;
        resetUser.resetPasswordToken = undefined;
        resetUser.resetPasswordExpires = undefined;

        await resetUser.save();

        await mailgun.sendEmail(resetUser.email, 'reset-confirmation');

        res.status(200).json({
            success: true,
            message:
                'Password changed successfully. Please login with your new password.'
        });

    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const email = req.user.email;
        const password = req.body.password;

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                error: 'Sorry, this user does not exist.'
            });
        }

        const hashedPassword = await User.hashPassword(password);
        existingUser.password = hashedPassword;

        await existingUser.save();

        await mailgun.sendEmail(existingUser.email, 'reset-confirmation');

        res.status(200).json({
            success: true,
            message:
                'Password changed successfully. Please login with your new password.'
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

const googleRedirect = (req, res) => {
    const jwt = `Bearer ${generateToken(req.user.id)}`;

    const htmlWithEmbeddedJWT = `
        <html>
            <script>
                // Save JWT to localStorage
                window.localStorage.setItem('token', '${jwt}');
                // Redirect browser to root of application
                window.location.href = '/auth/success';
            </script>
        </html>       
    `;

    res.send(htmlWithEmbeddedJWT);
}

const facebookRedirect = (req, res) => {
    const jwt = `Bearer ${generateToken(req.user.id)}`;

    const htmlWithEmbeddedJWT = `
        <html>
            <script>
                // Save JWT to localStorage
                window.localStorage.setItem('token', '${jwt}');
                // Redirect browser to root of application
                window.location.href = '/auth/success';
            </script>
        </html>       
    `;

    res.send(htmlWithEmbeddedJWT);
}

module.exports = {
    authUser,
    registerUser,
    forgotPassword,
    resetPasswordWithToken,
    resetPassword,
    googleRedirect,
    facebookRedirect
}
