const Users = require('./../models/users')

module.exports.getOne = async function(email, passcode) {
    console.log(email, passcode)
    return await Users.findOne({ email, passcode })
}