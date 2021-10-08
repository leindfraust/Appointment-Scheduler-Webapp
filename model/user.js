const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user