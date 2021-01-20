'use strict'
const authorsRepository = require('../repository/authors.repository')

async function listAllAuthors() {
    return await authorsRepository.readAll()
}

module.exports = {
    listAllAuthors
}