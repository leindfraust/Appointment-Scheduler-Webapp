const express = require('express');
const router = express.Router();
const {
    getAppointments,
    pushAppointment,
    updateAppointment,
    deleteAppointment
} = require('../../controllers/appointmentController')

router.get('/', getAppointments);

router.post('/', pushAppointment);

router.put('/:id', updateAppointment);

router.delete('/:id', deleteAppointment);

module.exports = router;