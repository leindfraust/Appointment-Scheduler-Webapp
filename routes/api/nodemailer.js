const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')

//nodemailer config
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.nodemaileruser,
        pass: process.env.nodemailerpass
    }
});

//nodemailer smtp@gmail
router.post('/sendMail', (req, res) => {
    let email = req.body.email
    let code = req.body.code
    var mailOptions = {
        from: process.env.nodemaileruser,
        to: email,
        subject: 'Login request code',
        text: `Your login request code is: ${code}. \nIf you did not request this, please reply to this email. \n\nBest Regards,\nRonan`
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
router.post('/OTPMail', (req, res) => {
    let email = req.body.email
    let code = req.body.code
    var mailOptions = {
        from: process.env.nodemaileruser,
        to: email,
        subject: 'Verification',
        text: `Your verification code is: ${code}. \nIf you did not request this, please reply to this email. \n\nBest Regards,\nRonan`
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

module.exports = router;