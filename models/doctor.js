import mongoose from 'mongoose'
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
        unique: true
    },
    licenseNo: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    visits: {
        type: Number,
        default: 0
    },
    appointmentCategories: {
        type: Array,
        default: ["Consultation"]
    },
    paymentMethods: Object,
    specialist: Array,
    schedule: Array,
    patients: Array,
    hospitalOrigin: Array,
    messageHistory: Array
});

export const Doctor = mongoose.model('doctor', doctorSchema);
