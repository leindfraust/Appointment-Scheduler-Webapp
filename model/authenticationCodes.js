const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const authenticationCodeSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: 600
        }
    }
});

const authenticationCode = mongoose.model('authenticationCode', authenticationCodeSchema);

module.exports = authenticationCode