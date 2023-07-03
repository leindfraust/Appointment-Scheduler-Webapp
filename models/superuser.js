import mongoose from 'mongoose'
const {
    Schema
} = mongoose;

const superUserSchema = new Schema({
    tickets: Array,
    gmail: Array
});

export const SuperUser = mongoose.model('superUser', superUserSchema);