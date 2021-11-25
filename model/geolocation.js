const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const geolocationSchema = new Schema({
    province: Array,
    citiesOrMunicipalities: Array
});

const geolocation = mongoose.model('geolocation', geolocationSchema);

module.exports = geolocation