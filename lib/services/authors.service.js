'use strict'
const authorsRepository = require('../repository/authors.repository')

async function getAllAuthors() {
    const authors = await authorsRepository.readAll()
    return authors
}

async function createNewAuthor(author) {
    const authorCreated = await authorsRepository.writeAuthor(author)
    return authorCreated
}

async function updateAuthor(id, author) {
    await checkIfExistsAuthor(id)
    const authorUpdated = await authorsRepository.updateAuthor(id, author)
    return authorUpdated
}

async function deleteAuthor(id) {
    await checkIfExistsAuthor(id)
    await authorsRepository.deleteAuthor(id)
}

async function checkIfExistsAuthor(id) {
    const existingAuthor = await authorsRepository.readAuthorById(id)
    if(!existingAuthor) throw new Error('Author not found with ID: ' + id)
}

module.exports = {
    getAllAuthors,
    createNewAuthor,
    updateAuthor,
    deleteAuthor
}