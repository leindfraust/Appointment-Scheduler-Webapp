const express = require('express');
const router = express.Router();
const {patientUpdatePassword, doctorUpdatePassword} = require('../../controllers/passwordController')

router.put('/patient', patientUpdatePassword);

router.put('/doctor', doctorUpdatePassword);

module.exports = router