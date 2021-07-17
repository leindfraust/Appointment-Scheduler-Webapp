const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const appointmentSchema = new Schema({
    doctor: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthDay: {
        type: String,
        required: true,
    },
    comments: String,
    contactNum: Number,
    schedule: {
        type: Array,
        required: true,
    },
    priorityNum: {
        type: Number,
        required: true,
    }
});

const appointmentList = mongoose.model('appointmentList', appointmentSchema);

module.exports = appointmentList