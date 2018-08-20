const mongoose = require('mongoose')

const clinicSchema = new mongoose.Schema({
    // dateCreated: {
    //     type: Date,
    //     default: Date.now
    // },
    abbreviation: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Clinic', clinicSchema)
