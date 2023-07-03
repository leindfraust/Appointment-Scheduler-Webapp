import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: Array,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    contactNum: {
        type: Number,
        required: true,
    },
    gmail: {
        type: String,
        unique: true,
        sparse: true,
    },
    province: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    currentAddress: {
        type: String,
        required: true,
    },
    messages: Array,
});

export const User = mongoose.model('user', userSchema);
