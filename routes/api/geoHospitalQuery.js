const express = require('express');
const router = express.Router();
const {getHospitalNearestUser} = require('../../controllers/geoController')

//geospatial query find near hospital in user's current location
router.post('/geoFindHospitalNearestUser', getHospitalNearestUser);

module.exports = router;