const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const doctorSchema = new Schema({
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
    hospitalOrigin: Array,
    messageHistory: Array
});

const doctor = mongoose.model('doctor', doctorSchema);

module.exports = doctor