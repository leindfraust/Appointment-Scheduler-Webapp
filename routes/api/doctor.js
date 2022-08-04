const express = require('express');
const router = express.Router();
const {
    getDoctors,
    getDoctorsForFilter,
    pushDoctor,
    updateDoctor,
    deleteDoctor,
    verify_username,
    check_username,
    check_alias,
    check_registrationCode,
    check_email
} = require('../../controllers/doctorController');

router.post('/check_registrationCode', check_registrationCode)

router.post('/check_alias', check_alias)

router.post('/check_email', check_email)

router.post('/check_username', check_username)

router.post('/verify_username', verify_username)

router.get('/', getDoctors);

router.get('/filteration', getDoctorsForFilter);

router.post('/', pushDoctor);

router.put('/:id', updateDoctor);

router.delete('/:id', deleteDoctor);

module.exports = router;