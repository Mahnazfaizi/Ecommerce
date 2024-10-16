const mongoose = require('mongoose');
const { Schema } = mongoose;

// this is the mongoDb user model

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    role: {
        type: String,
        default: "GENERAL"
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('users', userSchema);