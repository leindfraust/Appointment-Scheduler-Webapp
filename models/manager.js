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
    type: {
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
    postalCode: {
        type: Number,
        required: true
    },
    location: {
        type: {
            type: String,
        },
        coordinates: [Number]
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
    },
    details: Array
});

managerSchema.index({location: '2dsphere'})
const manager = mongoose.model('manager', managerSchema);

module.exports = manager