const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const adminSchema = new Schema({
    verified: {
        type: Boolean,
        default: false
    },
    alias: {
        type: String,
        required: true,
    },
    licenseNo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    specialist: Array,
    schedule: Array,
    patients: Array,
    hospitalOrigin: Array
});

const admin = mongoose.model('admin', adminSchema);

module.exports = admin