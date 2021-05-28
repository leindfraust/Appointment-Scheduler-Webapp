const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const appointmentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAdd: {
        type: String,
        required: true,
    },
    contactNum: Number,
    date: {
        type: Date,
        default: Date.now
    },
    month: {
        type: String,
    },
    dateNum: {
        type: Number,
    },
    day: {
        type: String,
    },
    statedHr: {
        type: Number,
    },
    expireHr: {
        type: Number,
    }
});

const appointmentList = mongoose.model('appointmentList', appointmentSchema);

module.exports = appointmentList