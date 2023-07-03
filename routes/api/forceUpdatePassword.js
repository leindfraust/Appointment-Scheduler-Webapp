import express from 'express';
const router = express.Router();
import {
    patientfUpdatePassword,
    doctorfUpdatePassword,
    managerfUpdatePassword
} from '../../controllers/passwordController.js'

router.put('/patient', patientfUpdatePassword);

router.put('/doctor', doctorfUpdatePassword);

router.put('/manager', managerfUpdatePassword);

export default router