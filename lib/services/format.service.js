'use strict'
const formatRepository = require('../repository/format.repository')

async function getAllFormats() {
    const formats = await formatRepository.readAll()
    return formats
}

async function createNewFormat(format) {
    const formatCreated = await formatRepository.writeFormat(format)
    return formatCreated
}

async function updateFormat(id, format) {
    await checkIfExistsFormat(id)
    const formatUpdated = await formatRepository.updateFormat(id, format)
    return formatUpdated
}

async function deleteFormat(id) {
    await checkIfExistsFormat(id)
    await formatRepository.deleteFormat(id)
}

async function checkIfExistsFormat(id) {
    const existingFormat = await formatRepository.readFormatById(id)
    if(!existingFormat) throw new Error('Format not found with ID: ' + id)
}

module.exports = {
    getAllFormats,
    createNewFormat,
    updateFormat,
    deleteFormat
}