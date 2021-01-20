'use strict'
const db = require('../db/db')

async function readAll() {
    const query = `SELECT * FROM author`
    const authors = await db.select(query)
    await db.closeConnection()
    return authors
}

async function writeAuthor(author) {
    const query = `INSERT INTO author(first_name, last_name, email, phone) VALUES('${author.firstName}','${author.lastName}','${author.email}','${author.phone}')`
    const authorId = await db.insert(query)
    const authorCreated = await readAuthorById(authorId)
    await db.closeConnection()
    return authorCreated
}

async function updateAuthor(id, author) {
    const query = `UPDATE author SET first_name='${author.firstName}', last_name='${author.lastName}', email='${author.email}', phone='${author.phone}' WHERE id=${id}`
    await db.executeQuery(query)
    const authorUpdated = await readAuthorById(id)
    await db.closeConnection()
    return authorUpdated
}

async function deleteAuthor(id) {
    const query = `DELETE FROM author WHERE id=${id}`
    await db.executeQuery(query)
    await db.closeConnection()
}

async function readAuthorById(id) {
    const query = `SELECT * FROM author WHERE author.id = ${id}`
    const authorsResult = await db.select(query)
    await db.closeConnection()
    return authorsResult[0]
}

module.exports = {
    readAll,
    writeAuthor,
    updateAuthor,
    deleteAuthor,
    readAuthorById
}
