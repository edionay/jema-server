const mongoose = require('mongoose')

const daysSchema = mongoose.Schema({
    label: { type: String, required: true },
    hours: [{
        label: String,
        date: String,
        available: {
            type: Boolean,
            default: true
        },
        appointment1: mongoose.Schema.Types.ObjectId,
        appointment2: mongoose.Schema.Types.ObjectId
    }],
    available: { type: Boolean, default: true }
})

module.exports = mongoose.model('Days', daysSchema)