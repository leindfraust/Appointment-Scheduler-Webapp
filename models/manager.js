import mongoose from 'mongoose'
const {
    Schema
} = mongoose;

const managerSchema = new Schema({
    registrationCode: {
        type: String,
        required: true,
        unique: true
    },
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
        unique: true,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    details: Array,
    ratings: {
        type: Number,
        default: 0
    },
    engagements: {
        type: Number,
        default: 0
    }
});

managerSchema.index({
    location: '2dsphere'
})
export const Manager = mongoose.model('manager', managerSchema);