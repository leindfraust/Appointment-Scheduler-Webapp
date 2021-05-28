const express = require('express');
const router = express.Router();
const AppointmentList = require('../../model/appointmentList');

router.get('/', async (req, res) => {
    res.send("hello world")
});

module.exports = router;