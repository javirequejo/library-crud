'use strict'
const db = require('../db/db')

async function readAuthorTitlesByTitle(titleId) {
    const query = `SELECT * FROM author_title WHERE title_id=${titleId}`
    const authorTitles = await db.select(query)
    await db.closeConnection()
    return authorTitles
}

async function writeAuthorTitle(authorId, titleId) {
    const query = `INSERT INTO author_title(author_id, title_id) VALUES('${authorId}','${titleId}')`
    await db.insert(query)
    await db.closeConnection()
}

async function deleteAuthorTitleByAuthor(authorId) {
    const query = `DELETE FROM author_title WHERE author_id=${authorId}`
    await db.executeQuery(query)
    await db.closeConnection()
}

async function deleteAuthorTitleByTitle(titleId) {
    const query = `DELETE FROM author_title WHERE title_id=${titleId}`
    await db.executeQuery(query)
    await db.closeConnection()
}

module.exports = {
    writeAuthorTitle,
    readAuthorTitlesByTitle,
    deleteAuthorTitleByAuthor,
    deleteAuthorTitleByTitle
}