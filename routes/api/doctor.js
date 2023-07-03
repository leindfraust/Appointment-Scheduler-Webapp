import express from 'express';
const router = express.Router();
import {
    getDoctors,
    getDoctorsForFilter,
    pushDoctor,
    updateDoctor,
    deleteDoctor,
    verify_username,
    check_username,
    check_alias,
    check_registrationCode,
    check_email,
    updateDoctorSchedule,
    getDoctorsForManager
} from '../../controllers/doctorController.js'

router.post('/check_registrationCode', check_registrationCode)

router.post('/check_alias', check_alias)

router.post('/check_email', check_email)

router.post('/check_username', check_username)

router.post('/verify_username', verify_username)

router.get('/', getDoctors);

router.post('/manager', getDoctorsForManager);

router.post('/filteration', getDoctorsForFilter);

router.post('/', pushDoctor);

router.put('/:id', updateDoctor);

router.put('/schedule_update/:id', updateDoctorSchedule);

router.delete('/:id', deleteDoctor);

export default router;