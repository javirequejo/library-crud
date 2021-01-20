'use strict'
const titlesRepository = require('../repository/titles.repository')

async function listAllTitles() {
    return await titlesRepository.readAll()
}

module.exports = {
    listAllTitles
}