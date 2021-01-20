'use strict'
const titleRepository = require('../repository/title.repository')
const authorRepository = require('../repository/author.repository')
const formatRepository = require('../repository/format.repository')
const authorTitleRepository = require('../repository/authorTitle.repository')

async function getAllTitles() {
    const titles = await titleRepository.readAll()
    for(const title of titles) {
        const {format} = title
        title.authors = await getAuthorsFromTitle(title.id)
        title.format = await formatRepository.readFormatById(format)
    }

    return titles
}

async function getAuthorsFromTitle(id) {
    const authors = []
    const authorsTitleRelations = await authorTitleRepository.readAuthorTitlesByTitle(id)
    for(const relation of authorsTitleRelations) {
        const author = await authorRepository.readAuthorById(relation.id)
        authors.push(author)
    }
    return authors
}

module.exports = {
    getAllTitles
}