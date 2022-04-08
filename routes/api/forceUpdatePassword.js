//for Forgot Password component in Vue

const express = require('express');
const router = express.Router();
const {
    patientfUpdatePassword,
    doctorfUpdatePassword,
    managerfUpdatePassword
} = require('../../controllers/passwordController')

router.put('/patient', patientfUpdatePassword);

router.put('/doctor', doctorfUpdatePassword);

router.put('/manager', managerfUpdatePassword);

module.exports = router