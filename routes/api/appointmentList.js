const express = require('express');
const router = express.Router();
const {
    getAppointments,
    pushAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsforDoctor,
    getAppointmentsforPatient
} = require('../../controllers/appointmentController')

router.get('/', getAppointments);

router.post('/', pushAppointment);

router.post('/doctors', getAppointmentsforDoctor)

router.post('/patients', getAppointmentsforPatient)

router.put('/:id', updateAppointment);

router.delete('/:id', deleteAppointment);

module.exports = router;