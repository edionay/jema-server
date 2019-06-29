const Days = require('../models/days')

module.exports.getAll = async function() {
    return await Days.find()
}

module.exports.getOne = async function(dayId) {
    return await Days.findById(dayId)
}