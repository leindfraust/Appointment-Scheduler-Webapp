import express from 'express';
const router = express.Router();
import {
    getGeolocations,
    pushGeolocation,
    updateGeolocation,
    deleteGeolocation,
    getProvinceNearestUser
} from '../../controllers/geoController.js'

router.get('/', getGeolocations);

router.post('/', pushGeolocation);

router.post('/geofind-near-user', getProvinceNearestUser)

router.put('/:id', updateGeolocation);

router.delete('/:id', deleteGeolocation);

export default router;