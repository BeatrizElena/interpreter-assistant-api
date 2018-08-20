const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    doctor: {
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
