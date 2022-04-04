const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const geolocationSchema = new Schema({
    province: String,
    citiesOrMunicipalities: Array
});

const geolocation = mongoose.model('geolocation', geolocationSchema);

module.exports = geolocation