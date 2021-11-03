const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const roomSchema = new Schema({
    roomID: {
        type: String,
        required: true
    },
    patient: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    messages: Array
});

const rooms = mongoose.model('rooms', roomSchema);

module.exports = rooms