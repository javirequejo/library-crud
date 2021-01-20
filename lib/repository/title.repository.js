'use strict'
const db = require('../db/db')

async function readAll() {
    const query = `SELECT * FROM title`
    const titles = await db.select(query)
    await db.closeConnection()
    return titles
}

module.exports = {
    readAll
}