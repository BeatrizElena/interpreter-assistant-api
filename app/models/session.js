const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Session', sessionSchema)
