'use strict'
const titlesRepository = require('../repository/title.repository')

async function listAllTitles() {
    return await titlesRepository.readAll()
}

module.exports = {
    listAllTitles
}