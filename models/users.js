const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    registration: { type: Number, require: true },
    cpf: { type: String, required: true },
    course: { type: String, required: true },
    passcode: { type: Number, require: true },
    upToVote: { type: Boolean, default: true },
    schedule: {
        day: String,
        date: String,
        time: String
    }
})

module.exports = mongoose.model('Users', usersSchema)