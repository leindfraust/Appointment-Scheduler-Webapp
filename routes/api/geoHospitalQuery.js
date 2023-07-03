import express from 'express';
const router = express.Router();
import { getHospitalNearestUser } from '../../controllers/geoController.js'

//geospatial query find near hospital in user's current location
router.post('/geoFindHospitalNearestUser', getHospitalNearestUser);

export default router;