const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            default: '',
        },
        guests: {
            type: String,
            default: '',
        },
        time: {
            type: String,
            default: '',
        },
        message: {
            type: String,
            default: '',
        },
        language: {
            type: String,
            default: 'en',
        },
    },
    { timestamps: true }
);

module.exports =
mongoose.models.Contact || mongoose.model('Contact', contactSchema);