import express from 'express';
const router = express.Router();
import {
    pullCity,
    pushCity
} from '../../controllers/geoController.js'

//pull city or municipality from a geolocation
router.post('/provinceCityPull', pullCity);

//push city/municipality in a geolocation 
router.post('/provinceUpdate', pushCity);

export default router;