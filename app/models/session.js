const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Session', sessionSchema)
