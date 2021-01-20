'use strict'
const titleRepository = require('../repository/title.repository')
const authorRepository = require('../repository/author.repository')
const formatRepository = require('../repository/format.repository')
const authorTitleRepository = require('../repository/authorTitle.repository')

async function getAllTitles() {
    const titles = await titleRepository.readAll()
    for(const title of titles) {
        await completeAdditionalDataFromTitle(title)
    }
    return titles
}

async function createNewTitle(title) {
    const {authors} = title
    await checkIfExistsFormat(title.format)
    
    for(const authorId of authors) {
        await checkIfExistsAuthor(authorId)
    }

    const titleCreated = await titleRepository.writeTitle(title)

    for(const authorId of authors) {
        await authorTitleRepository.writeAuthorTitle(authorId, titleCreated.id)
    }

    return await completeAdditionalDataFromTitle(titleCreated)
}

async function completeAdditionalDataFromTitle(title) {
    const {format} = title
    title.authors = await getAuthorsFromTitle(title.id)
    title.format = await formatRepository.readFormatById(format)
    return title
}

async function getAuthorsFromTitle(id) {
    const authors = []
    const authorsTitleRelations = await authorTitleRepository.readAuthorTitlesByTitle(id)
    for(const relation of authorsTitleRelations) {
        const author = await authorRepository.readAuthorById(relation.author_id)
        authors.push(author)
    }
    return authors
}

async function checkIfExistsFormat(id) {
    const existingFormat = await formatRepository.readFormatById(id)
    if(!existingFormat) throw new Error('Specified format in title not found with ID: ' + id)
}

async function checkIfExistsAuthor(id) {
    const existingAuthor = await authorRepository.readAuthorById(id)
    if(!existingAuthor) throw new Error('Specified author in title not found with ID: ' + id)
}

module.exports = {
    getAllTitles,
    createNewTitle
}