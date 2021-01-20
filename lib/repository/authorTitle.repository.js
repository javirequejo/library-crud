'use strict'
const db = require('../db/db')

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
    deleteAuthorTitleByAuthor,
    deleteAuthorTitleByTitle
}