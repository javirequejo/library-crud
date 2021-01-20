'use strict'
const formatsRepository = require('../repository/formats.repository')

async function listAllFormats() {
    return await formatsRepository.readAll()
}

module.exports = {
    listAllFormats
}