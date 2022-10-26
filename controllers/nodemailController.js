const nodemailer = require('nodemailer')
const authenticationCode = require('../models/authenticationCodes');

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
const loginReqMail = ((req, res) => {
    let email = req.body.email
    let code = Math.floor(1000 + Math.random() * 9000);
    let mailOptions = {
        from: process.env.nodemaileruser,
        to: email,
        subject: 'Login request code',
        text: `Your login request code is: ${code}. \nIf you did not request this, please reply to this email. \n\nBest Regards,\nMedic Search`
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log(error);
            res.status(400).end();
        } else {
            console.log('Email sent: ' + info.response);
            const newAuthenticationCode = new authenticationCode({
                email: email,
                code: code
            });
            try {
                const authCode = await newAuthenticationCode.save()
                if (!authCode) throw new Error('Cannot save')
                res.status(200).end()
            } catch (err) {
                res.status(500).send({
                    message: err.message
                })
            }
        }
    });
});

//OTP
const OTPMail = ((req, res) => {
    let email = req.body.email
    let code = Math.floor(1000 + Math.random() * 9000);
    let mailOptions = {
        from: process.env.nodemaileruser,
        to: email,
        subject: 'Verification',
        text: `Your verification code is: ${code}. \nIf you did not request this, please reply to this email. \n\nBest Regards,\nMedic Search`
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log(error);
            res.status(400).end();
        } else {
            console.log('Email sent: ' + info.response);
            const newAuthenticationCode = new authenticationCode({
                email: email,
                code: code
            });
            try {
                const authCode = await newAuthenticationCode.save()
                if (!authCode) throw new Error('Cannot save')
                res.status(200).end()
            } catch (err) {
                res.status(500).send({
                    message: err.message
                })
            }
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
        text: `Greetings! We have received your complaint about "${ticketTitle}", your ticket ID is ${ticketID}. Expect a follow up after 1-2 working days.   \n\nBest Regards,\nMedic Search`
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
    loginReqMail,
    OTPMail,
    supportMail
}