'use strict'
const db = require('../db/db')

async function readAll() {
    const rawQuery = "SELECT * FROM format"
    return await db.select(rawQuery)
}

module.exports = {
    readAll
}