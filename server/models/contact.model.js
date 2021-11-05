const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String
    },
    message: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
