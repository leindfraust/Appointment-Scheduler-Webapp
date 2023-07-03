import express from 'express';
const router = express.Router();
import {
    pushPatientDoctor,
    pullDoctorHospital,
    pushMessages,
    checkAvailabilityDoctors,
    pullMessage,
    clearMessages,
    pullPatientDoctor
} from '../../controllers/doctorController.js'

//pull doctor from a hospital
router.post('/doctorPullHospital', pullDoctorHospital);

//add patient records to the doctor of a new patient
router.post('/patientUpdate', pushPatientDoctor);

router.post('/patientDelete', pullPatientDoctor);

router.post('/pushMsg', pushMessages)

router.post('/pullMsg', pullMessage)

router.post('/clearMsg', clearMessages)

router.post('/checkDoctorAvailability', checkAvailabilityDoctors)

export default router;