const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    contactNum: {
        type: Number,
        required: true
    },
    gmail: String,
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    currentAddress: {
        type: String,
        required: true
    },
    messages: Array
});

const user = mongoose.model('user', userSchema);

module.exports = user