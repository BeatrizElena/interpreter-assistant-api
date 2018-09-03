const mongoose = require('mongoose')
// const phoneValidator = require('../validators/phone')

// phone validation docs: //https://mongoosejs.com/docs/validation.html
const doctorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true
        // validate: phoneValidator
    },
    phone: {
        type: String,
        required: true
    }
    // diseaseReference: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Disease',
    //     required: true
    // }
}, {
    timestamps: true
})

module.exports = mongoose.model('Doctor', doctorSchema)