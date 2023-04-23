const Hospital = require('../models/manager');
const Geolocation = require('../models/geolocation');

const getHospitalNearestUser = (async (req, res) => {
    let province = req.body.province
    let latitude = req.body.latitude
    let longitude = req.body.longitude
    let hospitalQuery = req.body.hospitalQuery

    try {
        const result = await Hospital.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    key: 'location',
                    distanceField: 'distance',
                    spherical: true
                }
            }
        ]).exec();

        const filteredResults = result.filter(x => x.status === 'Active' && x.province === province && x.hospital.toLowerCase().includes(hospitalQuery.toLowerCase()));
        const responseClient = [...filteredResults].map(x => {
            delete x.username;
            delete x.password;
            delete x.__v;
            delete x.email;
            delete x.pricing;
            return x;
        });

        res.status(200).send(responseClient);
    } catch (error) {
        console.log(error);
        res.end();
    }
});

const getProvinceNearestUser = (async (req, res) => {
    let latitude = req.body.latitude
    let longitude = req.body.longitude

    try {
        const result = await Geolocation.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    key: 'location',
                    distanceField: 'distance',
                    spherical: true
                }
            },
            {
                $limit: 1
            }
        ]).exec();

        const responseClient = [...result].map(x => {
            delete x.citiesOrMunicipalities;
            return x;
        });

        res.status(200).send(responseClient);
    } catch (error) {
        console.log(error);
        res.end();
    }
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
const pullCity = (async (req, res) => {
    let provinceID = req.body.provinceID
    let postalCode = req.body.postalCode
    let cityOrMunicipality = req.body.cityOrMunicipality
    let latitude = req.body.latitude
    let longitude = req.body.longitude

    try {
        const result = await Geolocation.findOneAndUpdate(
            {
                _id: provinceID
            },
            {
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
            },
            {
                returnOriginal: false,
                multi: true
            }
        ).exec();

        console.log(result);
        res.end();
    } catch (error) {
        console.log(error);
    }
});

//push city/municipality in a Geolocation 
const pushCity = (async (req, res) => {
    let provinceID = req.body.provinceID
    let postalCode = req.body.postalCode
    let cityOrMunicipality = req.body.cityOrMunicipality
    let latitude = req.body.latitude
    let longitude = req.body.longitude

    try {
        const result = await Geolocation.findOneAndUpdate(
            {
                _id: provinceID
            },
            {
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
            },
            {
                returnOriginal: false
            }
        ).exec();

        console.log(result);
        res.end();
    } catch (error) {
        console.log(error);
    }
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