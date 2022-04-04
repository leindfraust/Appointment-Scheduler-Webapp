const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const superUserSchema = new Schema({
    tickets: Array,
    gmail: Array
});

const superUser = mongoose.model('superUser', superUserSchema);

module.exports = superUser