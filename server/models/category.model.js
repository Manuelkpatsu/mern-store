const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const options = {
    separator: '-',
    lang: 'en',
    truncate: 120
};

mongoose.plugin(slug, options);

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
