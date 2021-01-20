'use strict'
const formatsRepository = require('../repository/formats.repository')

async function getAllFormats() {
    const formats = await formatsRepository.readAll()
    return formats
}

async function createNewFormat(format) {
    const formatCreated = await formatsRepository.writeFormat(format)
    return formatCreated
}

async function updateFormat(id, format) {
    await isFormat(id)
    const formatUpdated = await formatsRepository.updateFormat(id, format)
    return formatUpdated
}

async function deleteFormat(id) {
    await isFormat(id)
    await formatsRepository.deleteFormat(id)
}

async function isFormat(id) {
    const existingFormat = await formatsRepository.readFormatById(id)
    if(!existingFormat) throw new Error('Format not found with ID: ' + id)
}

module.exports = {
    getAllFormats,
    createNewFormat,
    updateFormat,
    deleteFormat
}