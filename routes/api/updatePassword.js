import express from 'express';
const router = express.Router();
import { patientUpdatePassword, doctorUpdatePassword, managerUpdatePassword } from '../../controllers/passwordController.js'

router.put('/patient', patientUpdatePassword);

router.put('/doctor', doctorUpdatePassword);

router.put('/manager', managerUpdatePassword)

export default router