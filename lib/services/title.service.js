'use strict'
const titleRepository = require('../repository/title.repository')

async function listAllTitles() {
    return await titleRepository.readAll()
}

module.exports = {
    listAllTitles
}