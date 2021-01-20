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

async function updateTitle(id, title) {
    const {authors} = title
    await checkIfExistsTitle(id)
    await checkIfExistsFormat(title.format)

    for(const authorId of authors) {
        await checkIfExistsAuthor(authorId)
    }

    const titleUpdated = await titleRepository.updateTitle(id, title)

    await updateAuthorTitles(id, authors)

    return await completeAdditionalDataFromTitle(titleUpdated)
}

async function deleteTitle(id) {
    await checkIfExistsTitle(id)
    await authorTitleRepository.deleteAuthorTitleByTitle(id)
    await titleRepository.deleteTitle(id)
}

async function completeAdditionalDataFromTitle(title) {
    const {format} = title
    title.authors = await getAuthorsFromTitle(title.id)
    title.format = await formatRepository.readFormatById(format)
    return title
}

async function updateAuthorTitles(titleId, authorsList) {
    const existingAuthorTitleRelations = await authorTitleRepository.readAuthorTitlesByTitle(titleId)

    for(const existingRelation of existingAuthorTitleRelations) {
        if(!authorsList.includes(existingRelation.author_id)) {
            await authorTitleRepository.deleteAuthorTitleByAuthor(existingRelation.author_id)
        }
    }

    for(const newAuthorId of authorsList) {
        const existsRelation = existingAuthorTitleRelations.find(relation => relation.author_id === newAuthorId)
        if(!existsRelation) await authorTitleRepository.writeAuthorTitle(newAuthorId, titleId)
    }
}

async function getAuthorsFromTitle(id) {
    const authors = []
    const authorTitleRelations = await authorTitleRepository.readAuthorTitlesByTitle(id)
    for(const relation of authorTitleRelations) {
        const author = await authorRepository.readAuthorById(relation.author_id)
        authors.push(author)
    }
    return authors
}


async function checkIfExistsTitle(id) {
    const existingTitle = await titleRepository.readTitleById(id)
    if(!existingTitle) throw new Error('Title not found with ID: ' + id)
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
    createNewTitle,
    updateTitle,
    deleteTitle
}