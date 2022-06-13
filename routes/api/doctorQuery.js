const express = require('express');
const router = express.Router();
const {
    pushPatientDoctor,
    pullDoctorHospital,
    pushMessages,
    checkAvailabilityDoctors,
    pullMessage,
    clearMessages
} = require('../../controllers/doctorController')

//pull doctor from a hospital
router.post('/doctorPullHospital', pullDoctorHospital);

//add patient records to the doctor of a new patient
router.post('/patientUpdate', pushPatientDoctor);

router.post('/pushMsg', pushMessages)

router.post('/pullMsg', pullMessage)

router.post('/clearMsg', clearMessages)

router.post('/checkDoctorAvailability', checkAvailabilityDoctors)

module.exports = router;