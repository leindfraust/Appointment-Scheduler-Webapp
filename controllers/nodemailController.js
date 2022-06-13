const nodemailer = require('nodemailer')

//nodemailer config
let transporter = nodemailer.createTransport({
    service: 'Hotmail',
    host: 'smpt.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.nodemaileruser,
        pass: process.env.nodemailerpass
    }
});

//nodemailer smtp@gmail
const sendMail = ((req, res) => {
    let email = req.body.email
    let code = req.body.code
    let mailOptions = {
        from: process.env.nodemaileruser,
        to: email,
        subject: 'Login request code',
        text: `Your login request code is: ${code}. \nIf you did not request this, please reply to this email. \n\nBest Regards,\nMed Search`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).end();
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).end();
        }
    });
});

//OTP
const OTPMail = ((req, res) => {
    let email = req.body.email
    let code = req.body.code
    let mailOptions = {
        from: process.env.nodemaileruser,
        to: email,
        subject: 'Verification',
        text: `Your verification code is: ${code}. \nIf you did not request this, please reply to this email. \n\nBest Regards,\nMed Search`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).end();
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).end();
        }
    });
});

//Contact Support
const supportMail = ((req, res) => {
    let ticketTitle = req.body.ticketTitle
    let ticketType = req.body.ticketType
    let email = req.body.email
    let ticketID = req.body.ticketID
    let mailOptions = {
        from: process.env.nodemaileruser,
        to: email,
        subject: `Customer Support: ${ticketType}`,
        text: `Greetings! We have received your complaint about "${ticketTitle}", your ticket ID is ${ticketID}. Expect a follow up after 1-2 working days.   \n\nBest Regards,\nMed Search`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).end();
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).end();
        }
    });
});

module.exports = {
    sendMail,
    OTPMail,
    supportMail
}