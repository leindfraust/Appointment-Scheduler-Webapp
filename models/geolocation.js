const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const geolocationSchema = new Schema({
    province: {
        type: String,
        unique: true,
        required: true
    },
    geolocation: {
        type: Object,
        required: true
    },
    citiesOrMunicipalities: Array
});

const geolocation = mongoose.model('geolocation', geolocationSchema);

module.exports = geolocation