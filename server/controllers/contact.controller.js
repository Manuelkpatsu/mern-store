const Contact = require('../models/contact.model');
const mailgun = require('../services/mailgun');

const sendMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'You must enter an email address.' });
        }
        
        if (!name) {
            return res.status(400).json({ error: 'You must enter description & name.' });
        }
        
        if (!message) {
            return res.status(400).json({ error: 'You must enter a message.' });
        }
        
        const contact = new Contact({
            name,
            email,
            message
        });

        const data = await contact.save();

        await mailgun.sendEmail(email, 'contact');

        res.status(200).json({
            success: true,
            message: `We received your message, we will reach you on your email address ${email}!`,
            contact: data
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

module.exports = sendMessage;
