'use strict'
const db = require('../db/db')

async function readAll() {
    const rawQuery = `SELECT t.id, t.isbn, t.title, t.description, t.publication_date, f.code as format FROM title t INNER JOIN format f ON t.format = f.id;`
    const rawTitles = await db.select(rawQuery)
    return await addAuthorsToTitles(rawTitles)
}

async function addAuthorsToTitles(titles) {
    for (let i = 0; i < titles.length; i++) {
        const rawQuery = `SELECT author.first_name, author.last_name, author.email, author.phone FROM author_title INNER JOIN author ON author_title.author_id = author.id WHERE title_id = ${titles[i].id}`
        const authors = await db.select(rawQuery)
        if(authors.length>0) titles[i].authors = authors
    }
    return titles
}

module.exports = {
    readAll
}