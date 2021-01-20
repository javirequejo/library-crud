'use strict'
const db = require('../db/db')

async function readAll() {
    const query = `SELECT * FROM format`
    const formats = await db.select(query)
    await db.closeConnection()
    return formats
}

async function writeFormat(format) {
    const query = `INSERT INTO format(code, description) VALUES('${format.code}','${format.description}')`
    const formatId = await db.insert(query)
    const formatCreated = await readFormatById(formatId)
    await db.closeConnection()
    return formatCreated
}

async function updateFormat(id, format) {
    const query = `UPDATE format SET code='${format.code}', description='${format.description}' WHERE id=${id}`
    await db.executeQuery(query)
    const formatUpdated = await readFormatById(id)
    await db.closeConnection()
    return formatUpdated
}

async function deleteFormat(id) {
    const query = `DELETE FROM format WHERE id=${id}`
    await db.executeQuery(query)
    await db.closeConnection()
}

async function readFormatById(id) {
    const query = `SELECT * FROM format WHERE format.id = ${id}`
    const formatsResult = await db.select(query)
    await db.closeConnection()
    return formatsResult[0]
}

module.exports = {
    readAll,
    writeFormat,
    updateFormat,
    deleteFormat,
    readFormatById
}