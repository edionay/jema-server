const usersRepository = require('./../repositories/users')

module.exports.login = async function(email, passcode) {
    return await usersRepository.getOne(email, passcode)
}

module.exports.getOne = async function(email, passcode) {
    return await usersRepository.getOne(email, passcode)
}