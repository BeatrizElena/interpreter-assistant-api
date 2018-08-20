const mongoose = require('mongoose')

const diseaseSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    name_english: {
        type: String
    },
    name_translated: {
        type: String
    },
    description_english: {
        type: String
    },
    description_translated: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Disease', diseaseSchema)
