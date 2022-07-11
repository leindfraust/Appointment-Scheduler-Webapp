const express = require('express');
const router = express.Router();
const {
    loginReqMail,
    OTPMail,
    supportMail
} = require('../../controllers/nodemailController')

router.post('/loginReqMail', loginReqMail);

//OTP
router.post('/OTPMail', OTPMail);

//Contact Support
router.post('/SupportMail', supportMail);

module.exports = router;