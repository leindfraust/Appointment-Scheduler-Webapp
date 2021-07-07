const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const specializationSchema = new Schema({
    specialization: {
        type: String,
        required: true
    },
});

const specialList = mongoose.model('specialList', specializationSchema);

module.exports = specialList