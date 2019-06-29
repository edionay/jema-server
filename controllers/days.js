const daysRepository = require('../repositories/days')

module.exports.getAll = async function(credentials) {
    return await daysRepository.getAll()
}

module.exports.getOne = async function(dayId) {
    return await daysRepository.getOne(dayId)
}