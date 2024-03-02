// Import nodemailer
const nodemailer = require('nodemailer');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "zaryab.110786@gmail.com",
        pass: "ilhp qnna xmkz xwzk",
    },
});

// Verify transporter
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

// Export sendEmail function
module.exports.sendEmail = async function (toEmail, subject, body) {
    try {
        // Send email
        const info = await transporter.sendMail({
            from: "zaryab.110786@gmail.com",
            to: toEmail,
            subject: subject,
            text: subject,
            html: body,
        });

        console.log('Email sent:', info);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
