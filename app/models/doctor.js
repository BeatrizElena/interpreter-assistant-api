const mongoose = require('mongoose')
// phone validation docs: //https://mongoosejs.com/docs/validation.html
const doctorSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    },
    phone: {
        type: String,
        required: true
    },
    disease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Doctor', doctorSchema)
