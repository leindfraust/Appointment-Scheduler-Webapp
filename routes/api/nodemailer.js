const express = require('express');
const router = express.Router();
const {
    sendMail,
    OTPMail,
    supportMail
} = require('../../controllers/nodemailController')

router.post('/sendMail', sendMail);

//OTP
router.post('/OTPMail', OTPMail);

//Contact Support
router.post('/SupportMail', supportMail);

module.exports = router;