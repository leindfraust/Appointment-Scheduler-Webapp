const express = require('express');
const router = express.Router();
const AppointmentList = require('../../model/appointmentList');

router.get('/', async (req, res) => {
    if(req.session){
        res.send('Hello')
    }
});

module.exports = router;