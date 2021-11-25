const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const managerSchema = new Schema({
    pricing: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    barangayORStreet: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longtitude: {
        type: Number,
        required: true
    },
    specializations: {
        type: Array,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const manager = mongoose.model('manager', managerSchema);

module.exports = manager