const express = require('express');
const router = express.Router();
const {
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
} = require('../../controllers/appointmentController')

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

module.exports = router;