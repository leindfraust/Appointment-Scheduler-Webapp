const express = require('express');
const router = express.Router();
const {
    getGeolocations,
    pushGeolocation,
    updateGeolocation,
    deleteGeolocation,
    getProvinceNearestUser
} = require('../../controllers/geoController')

router.get('/', getGeolocations);

router.post('/', pushGeolocation);

router.post('/geofind-near-user', getProvinceNearestUser)

router.put('/:id', updateGeolocation);

router.delete('/:id', deleteGeolocation);

module.exports = router;