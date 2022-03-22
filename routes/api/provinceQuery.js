const express = require('express');
const router = express.Router();
const Province = require('../../models/geolocation');

//pull city or municipality from a province
router.post('/provinceCityPull', (req, res) => {
    let provinceID = req.body.provinceID
    let postalCode = req.body.postalCode
    let cityOrMunicipality = req.body.cityOrMunicipality
    let latitude = req.body.latitude
    let longitude = req.body.longitude

    Province.findOneAndUpdate({
        _id: provinceID
    }, {
        $pull: {
            citiesOrMunicipalities: {
                name: cityOrMunicipality,
                postalCode: postalCode,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            }
        }
    }, {
        returnOriginal: false,
        multi: true
    }, function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
            res.end()
        }
    });
});

//push city/municipality in a Province 
router.post('/provinceUpdate', (req, res) => {
    let provinceID = req.body.provinceID
    let postalCode = req.body.postalCode
    let cityOrMunicipality = req.body.cityOrMunicipality
    let latitude = req.body.latitude
    let longitude = req.body.longitude

    Province.findOneAndUpdate({
        _id: provinceID
    }, {
        $push: {
            citiesOrMunicipalities: {
                name: cityOrMunicipality,
                postalCode: postalCode,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            }

        }
    }, {
        returnOriginal: false
    }, function (error, success) {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
            res.end()
        }
    });
});

module.exports = router;