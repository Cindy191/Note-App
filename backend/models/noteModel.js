const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    noteDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Note', notesSchema)
