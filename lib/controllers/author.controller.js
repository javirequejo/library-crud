'use strict'
const authorService = require('../services/author.service')
const validator = require('../utils/validator')
const primitiveValidators = require('../utils/primitiveValidators')

const authorValidationStructure = {
    "first_name": primitiveValidators.string,
    "last_name": primitiveValidators.string,
    "email": primitiveValidators.string,
    "phone": primitiveValidators.string
}

async function getAllAuthors(req, res, next) {
    try {
        const authorsList = await authorService.getAllAuthors()
        return res.status(200).json(authorsList)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

async function createNewAuthor(req, res, next) {
    try {
        validator.inputValidate(req.body, authorValidationStructure)
        const author = await authorService.createNewAuthor(req.body)
        return res.status(201).json(author)
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

async function updateAuthor(req, res, next) {
    try {
        const {id} = req.params
        validator.inputValidate(req.body, authorValidationStructure)

        const author = await authorService.updateAuthor(id, req.body)
        return res.status(200).json(author)
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
}

async function deleteAuthor(req, res, next) {
    try {
        const {id} = req.params
        await authorService.deleteAuthor(id)
        return res.status(200).send(`Author with id: ${id} deleted succesfully`)
    } catch(error) {
        return res.status(400).send({message: error.message})
    }
}

module.exports = {
    getAllAuthors,
    createNewAuthor,
    updateAuthor,
    deleteAuthor
}



