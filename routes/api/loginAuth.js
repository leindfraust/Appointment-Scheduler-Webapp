const express = require('express');
const router = express.Router();
const {
    patientAuth,
    doctorAuth,
    managerAuth
} = require('../../controllers/authController')

//patient login
router.post('/patient', patientAuth);

//doctor login
router.post('/doctor', doctorAuth);

//manager login
router.post('/manager', managerAuth);

module.exports = router