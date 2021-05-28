const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const adminSchema = new Schema({
    alias: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const admin = mongoose.model('admin', adminSchema);

module.exports = admin