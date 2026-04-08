// api/contact.js
const cors = require('../config/cors');
const connectDB = require('../config/db');
const transporter = require('../config/mailer');
const Contact = require('../models/Contact');

const {
    ownerTemplate,
    clientTemplateFR,
    clientTemplateEN
} = require('../utils/emailTemplates');

module.exports = async (req, res) => {
    if (cors(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed',
        });
    }

    try {
        await connectDB();

        let {
            name,
            email,
            phone,
            guests,
            time,
            message,
            language
        } = req.body || {};

        // Clean inputs
        name = name?.trim();
        email = email?.trim()?.toLowerCase();
        phone = phone?.trim() || '';
        guests = guests ? String(guests).trim() : '';
        time = time?.trim() || '';
        message = message?.trim() || '';
        language = language === 'en' ? 'en' : 'fr';

        // Validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required',
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address',
            });
        }

        // Save to DB
        const contact = await Contact.create({
            name,
            email,
            phone,
            guests,
            time,
            message,
            language,
        });

        const data = contact.toObject();

        // 📩 Email to owner
        const ownerMail = {
            from: `"GoldenSip ☕" <${process.env.SMTP_USER}>`,
            to: process.env.OWNER_EMAIL,
            subject: '☕ New Order / Reservation — GoldenSip',
            html: ownerTemplate(data),
        };

        // 📩 Email to client
        const clientMail = {
            from: `"GoldenSip ☕" <${process.env.SMTP_USER}>`,
            to: email,
            subject:
                language === 'en'
                    ? '✅ Your GoldenSip Request is Confirmed'
                    : '✅ Votre demande GoldenSip est confirmée',
            html:
                language === 'en'
                    ? clientTemplateEN(data)
                    : clientTemplateFR(data),
        };

        // 🚀 Send both emails in parallel
        await Promise.all([
            transporter.sendMail(ownerMail),
            transporter.sendMail(clientMail),
        ]);

        return res.status(200).json({
            success: true,
            message: 'Request sent successfully ☕',
            data,
        });

    } catch (error) {
        console.error('[GoldenSip API Error]', error);

        return res.status(500).json({
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong. Please try again.',
        });
    }
};