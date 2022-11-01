const Hospital = require('../models/manager');
const Geolocation = require('../models/geolocation');

const getHospitalNearestUser = ((req, res) => {
    let province = req.body.province
    let latitude = req.body.latitude
    let longitude = req.body.longitude

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
    }], (error, result) => {
        if (error) {
            console.log(error)
            res.end()
        } else {
            result = result.filter(x => x.status === 'Active' && x.province === province)
            let response_client = [...result]
            response_client.forEach(x => delete x.username && delete x.password && delete x.__v && delete x.email && delete x.pricing);
            res.status(200).send(response_client)
        }
    })
});

const getProvinceNearestUser = ((req, res) => {
    let latitude = req.body.latitude
    let longitude = req.body.longitude

    Geolocation.aggregate([{
        $geoNear: {
            near: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
            key: "location",
            distanceField: 'distance',
            spherical: true
        }
    }, { $limit: 1 }], (error, result) => {
        if (error) {
            console.log(error)
            res.end()
        } else {
            let response_client = [...result]
            delete response_client[0].citiesOrMunicipalities
            res.status(200).send(response_client)
        }
    })
});

const getGeolocations = (async (req, res) => {
    try {
        const geolocationList = await Geolocation.find()
        if (!geolocationList) throw new Error('no items')
        res.status(200).json(geolocationList)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

const pushGeolocation = (async (req, res) => {
    const newGeolocation = new Geolocation(req.body)
    try {
        const geolocationList = await newGeolocation.save()
        if (!geolocationList) throw new Error('Cannot save')
        res.status(200).json(geolocationList)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

const updateGeolocation = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const response = await Geolocation.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('cannot update')
        const updated = {
            ...response._doc,
            ...req.body
        }
        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

const deleteGeolocation = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await Geolocation.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});


//pull city or municipality from a Geolocation
const pullCity = ((req, res) => {
    let provinceID = req.body.provinceID
    let postalCode = req.body.postalCode
    let cityOrMunicipality = req.body.cityOrMunicipality
    let latitude = req.body.latitude
    let longitude = req.body.longitude

    Geolocation.findOneAndUpdate({
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

//push city/municipality in a Geolocation 
const pushCity = ((req, res) => {
    let provinceID = req.body.provinceID
    let postalCode = req.body.postalCode
    let cityOrMunicipality = req.body.cityOrMunicipality
    let latitude = req.body.latitude
    let longitude = req.body.longitude

    Geolocation.findOneAndUpdate({
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
module.exports = {
    getProvinceNearestUser,
    getHospitalNearestUser,
    getGeolocations,
    pushGeolocation,
    updateGeolocation,
    deleteGeolocation,
    pushCity,
    pullCity
}