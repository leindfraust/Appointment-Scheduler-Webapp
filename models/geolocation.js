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
    location: {
        type: {
            type: String,
        },
        coordinates: [Number]
    },
    citiesOrMunicipalities: Array
});

geolocationSchema.index({
    location: '2dsphere'
})
const geolocation = mongoose.model('geolocation', geolocationSchema);

module.exports = geolocation