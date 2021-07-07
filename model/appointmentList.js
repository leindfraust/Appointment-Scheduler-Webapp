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
    birthDay: {
        type: Number,
        required: true,
    },
    contactNum: Number,
    sched: {
        type: Array,
        required: true,
    },
    priorityNum: String
});

const appointmentList = mongoose.model('appointmentList', appointmentSchema);

module.exports = appointmentList