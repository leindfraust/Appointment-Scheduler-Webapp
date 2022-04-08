const express = require('express');
const router = express.Router();
const {
    pullCity,
    pushCity
} = require('../../controllers/geoController')

//pull city or municipality from a geolocation
router.post('/provinceCityPull', pullCity);

//push city/municipality in a geolocation 
router.post('/provinceUpdate', pushCity);

module.exports = router;