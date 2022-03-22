const mongoose = require('mongoose')
const {
    Schema
} = mongoose;

const superUserSchema = new Schema({
    pricingList: Array,
    specializationList: Array,
    gmail: Array
});

const superUser = mongoose.model('superUser', superUserSchema);

module.exports = superUser