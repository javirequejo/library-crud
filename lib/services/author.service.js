'use strict'
const authorRepository = require('../repository/author.repository')
const authorTitleRepository = require('../repository/authorTitle.repository')

async function getAllAuthors() {
    const authors = await authorRepository.readAll()
    return authors
}

async function createNewAuthor(author) {
    const authorCreated = await authorRepository.writeAuthor(author)
    return authorCreated
}

async function updateAuthor(id, author) {
    await checkIfExistsAuthor(id)
    const authorUpdated = await authorRepository.updateAuthor(id, author)
    return authorUpdated
}

async function deleteAuthor(id) {
    await checkIfExistsAuthor(id)
    await authorTitleRepository.deleteAuthorTitleByAuthor(id)
    await authorRepository.deleteAuthor(id)
}

async function checkIfExistsAuthor(id) {
    const existingAuthor = await authorRepository.readAuthorById(id)
    if(!existingAuthor) throw new Error('Author not found with ID: ' + id)
}

module.exports = {
    getAllAuthors,
    createNewAuthor,
    updateAuthor,
    deleteAuthor
}