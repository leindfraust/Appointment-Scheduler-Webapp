import express from 'express'
const router = express.Router();
import {
    getAppointments,
    pushAppointment,
    checkDoubleAppointment,
    checkMultipleAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsforDoctor,
    getAppointmentsforPatient,
    getAppointmentsforManager,
    getAppointmentsforDoctorCheckPriority,
    getCancelledAppointmentsforPatientAndDoctor
} from '../../controllers/appointmentController.js'

router.get('/', getAppointments);

router.post('/', pushAppointment);

router.post('/check-double-appointment', checkDoubleAppointment);

router.post('/check-multiple-appointment', checkMultipleAppointment);

router.post('/managers', getAppointmentsforManager)

router.post('/doctors', getAppointmentsforDoctor)

router.post('/doctors/checkPriority', getAppointmentsforDoctorCheckPriority)

router.post('/cancelledAppointments', getCancelledAppointmentsforPatientAndDoctor)

router.post('/patients', getAppointmentsforPatient)

router.put('/:id', updateAppointment);

router.delete('/:id', deleteAppointment);

export default router