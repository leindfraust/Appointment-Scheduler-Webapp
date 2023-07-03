import mongoose from 'mongoose'
const {
    Schema
} = mongoose;

const appointmentSchema = new Schema({
    referenceID: {
        type: String,
        required: true,
        unique: true
    },
    hospital: {
        type: String,
        required: true
    },
    doctorID: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    doctorSpecialization: String,
    patientID: {
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
        type: String,
        required: true,
    },
    appointmentCategory: {
        type: String,
        required: true
    },
    ifPatientVisited: {
        type: Boolean,
        default: false
    },
    ifPatientCancelled: {
        type: Boolean,
        default: false
    }
});

export const AppointmentList = mongoose.model('appointmentList', appointmentSchema);