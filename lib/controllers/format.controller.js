'use strict'
const formatsService = require('../services/format.service')
const validator = require('../utils/validator')
const primitiveValidators = require('../utils/primitiveValidators')

const formatValidationStructure = {
    "code": primitiveValidators.string,
    "description": primitiveValidators.string
}

async function getAllFormats(req, res, next) {
    try {
        const formatsList = await formatsService.getAllFormats()
        return res.status(200).json(formatsList)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

async function createNewFormat(req, res, next) {
    try {
        validator.inputValidate(req.body, formatValidationStructure)
        const format = await formatsService.createNewFormat(req.body)
        return res.status(201).json(format)
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

async function updateFormat(req, res, next) {
    try {
        const {id} = req.params
        validator.inputValidate(req.body, formatValidationStructure)

        const format = await formatsService.updateFormat(id, req.body)
        return res.status(200).json(format)
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

async function deleteFormat(req, res, next) {
    try {
        const {id} = req.params
        await formatsService.deleteFormat(id)
        return res.status(200).send(`Format with id: ${id} deleted succesfully`)
    } catch(error) {
        return res.status(400).send({message: error.message})
    }
}

module.exports = {
    getAllFormats,
    createNewFormat,
    updateFormat,
    deleteFormat
}