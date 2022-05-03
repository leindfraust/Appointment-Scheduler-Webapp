const express = require('express');
const router = express.Router();
const {
    pushPatientDoctor,
    pullDoctorHospital,
    pushMessages
} = require('../../controllers/doctorController')

//pull doctor from a hospital
router.post('/doctorPullHospital', pullDoctorHospital);

//add patient records to the doctor of a new patient
router.post('/patientUpdate', pushPatientDoctor);

router.post('/pushMsg', pushMessages)

module.exports = router;