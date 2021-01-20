'use strict'
const titleService = require('../services/title.service')
const validator = require('../utils/validator')
const primitiveValidators = require('../utils/primitiveValidators')

const titleValidationStructure = {
    "isbn": primitiveValidators.string,
    "title": primitiveValidators.string,
    "description": primitiveValidators.string,
    "publication_date": primitiveValidators.string,
    "format": primitiveValidators.int,
    "authors": primitiveValidators.array
}

async function getAllTitles(req, res, next) {
    try {
        const titlesList = await titleService.getAllTitles()
        return res.status(200).json(titlesList)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

async function createNewTitle(req, res, next) {
    try {
        validator.inputValidate(req.body, titleValidationStructure)
        const title = await titleService.createNewTitle(req.body)
        return res.status(201).json(title)
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

async function updateTitle(req, res, next) {
    try {
        const {id} = req.params
        validator.inputValidate(req.body, titleValidationStructure)

        const title = await titleService.updateTitle(id, req.body)
        return res.status(200).json(title)
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

async function deleteTitle(req, res, next) {
    try {
        const {id} = req.params
        await titleService.deleteTitle(id)
        return res.status(200).send(`Title with id: ${id} deleted succesfully`)
    } catch(error) {
        return res.status(400).send({message: error.message})
    }
}

module.exports = {
    getAllTitles,
    createNewTitle,
    updateTitle,
    deleteTitle
}
