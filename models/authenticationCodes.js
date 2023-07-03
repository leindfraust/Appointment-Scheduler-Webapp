import mongoose from 'mongoose'
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

export const AuthenticationCode = mongoose.model('authenticationCode', authenticationCodeSchema);
