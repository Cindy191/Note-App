const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // token:{
    //     type: String,
    //     required: true
    // },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Register', registerSchema);