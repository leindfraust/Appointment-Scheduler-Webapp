import express from 'express';
const router = express.Router();
import {
    loginReqMail,
    OTPMail,
    supportMail
} from '../../controllers/nodemailController.js'

router.post('/loginReqMail', loginReqMail);

//OTP
router.post('/OTPMail', OTPMail);

//Contact Support
router.post('/SupportMail', supportMail);

export default router;