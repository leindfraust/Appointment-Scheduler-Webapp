const express = require('express');
const router = express.Router();
const {patientUpdatePassword, doctorUpdatePassword, managerUpdatePassword} = require('../../controllers/passwordController')

router.put('/patient', patientUpdatePassword);

router.put('/doctor', doctorUpdatePassword);

router.put('/manager', managerUpdatePassword)

module.exports = router