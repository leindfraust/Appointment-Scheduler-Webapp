const express = require('express');
const router = express.Router();
const {
    getGeolocations,
    pushGeolocation,
    updateGeolocation,
    deleteGeolocation
} = require('../../controllers/geoController')

router.get('/', getGeolocations);

router.post('/', pushGeolocation);

router.put('/:id', updateGeolocation);

router.delete('/:id', deleteGeolocation);

module.exports = router;