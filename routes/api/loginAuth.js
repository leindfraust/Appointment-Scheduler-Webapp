import express from 'express';
const router = express.Router();
import {
    patientAuth,
    doctorAuth,
    managerAuth
} from '../../controllers/authController.js'

//patient login
router.post('/patient', patientAuth);

//doctor login
router.post('/doctor', doctorAuth);

//manager login
router.post('/manager', managerAuth);

export default router 