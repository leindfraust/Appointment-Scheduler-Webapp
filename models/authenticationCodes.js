const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const authenticationCodeSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: 600 //10 minutes
        }
    }
});

const authenticationCode = mongoose.model('authenticationCode', authenticationCodeSchema);

module.exports = authenticationCode