'use strict'
const db = require('../db/db')

async function readAll() {
    const query = `SELECT * FROM title`
    const titles = await db.select(query)
    await db.closeConnection()
    return titles
}

async function writeTitle(title) {
    const query = `INSERT INTO title(isbn, title, description, publication_date, format) VALUES('${title.isbn}','${title.title}','${title.description}','${title.publication_date}', ${title.format})`
    const titleId = await db.insert(query)
    const titleCreated = await readTitleById(titleId)
    await db.closeConnection()
    return titleCreated
}

async function updateTitle(id, title) {
    const query = `UPDATE title SET isbn='${title.isbn}', title='${title.title}', description='${title.description}', publication_date='${title.publication_date}', format=${title.format} WHERE id=${id}`
    await db.executeQuery(query)
    const titleUpdated = await readTitleById(id)
    await db.closeConnection()
    return titleUpdated
}

async function deleteTitle(id) {
    const query = `DELETE FROM title WHERE id=${id}`
    await db.executeQuery(query)
    await db.closeConnection()
}

async function readTitleById(id) {
    const query = `SELECT * FROM title WHERE id = ${id}`
    const titlesResult = await db.select(query)
    await db.closeConnection()
    return titlesResult[0]
}

module.exports = {
    readAll,
    writeTitle,
    updateTitle,
    deleteTitle,
    readTitleById
}