const express = require('express');
const router = express.Router();
const {
    getDoctors,
    pushDoctor,
    updateDoctor,
    deleteDoctor
} = require('../../controllers/doctorController');

router.get('/', getDoctors);

router.post('/', pushDoctor);

router.put('/:id', updateDoctor);

router.delete('/:id', deleteDoctor);

module.exports = router;