const mongoose = require('mongoose')

const clinicSchema = new mongoose.Schema({
    abbreviation: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {//https://mongoosejs.com/docs/validation.html
        type: String,
        validate: {
        validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
        } 
    },
    description: {
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Clinic', clinicSchema)
