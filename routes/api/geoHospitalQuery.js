const express = require('express');
const router = express.Router();
const Hospital = require('../../models/manager');
const app = express()
const parser =  app.use(express.json()) 
let userLocationQuery = ''

//geospatial query find near hospital in user's current location
router.post('/geoFindHospitalNearestUser', parser, (req, res, next) => {
    let province = req.body.province
    let latitude = req.body.latitude
    let longitude = req.body.longitude

    const userLocation = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Hospital.aggregate([{
        $geoNear: {
            near: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
            key: "location",
            distanceField: 'distance',
            spherical: true
        }
    }], (error, success) => {
        if (error) {
            console.log(error)
            res.end()
        } else {
            console.log(success)
            userLocationQuery = success.filter(x => x.province === province && x.status === 'Active')
            res.status(200).end()
        }
    })

})
router.get('/geoHospitalNearestUser', (req, res, next) => {
    res.send(userLocationQuery).status(200)
});

module.exports = router;