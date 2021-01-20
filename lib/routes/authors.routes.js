'use strict'
const router = require('express').Router();
const authorsService = require('../services/authors.service')

// Read authors list
router.get('/', async (req, res, next) => {
    const authorsList = await authorsService.listAllAuthors()
    return res.status(200).json(authorsList)
});

// Create a new author
router.post('/', async (req, res, next) => {

})

// Update an existing author
router.put('/:id', async (req, res, next) => {

})

// Delete an existing author
router.delete('/:id', async (req, res, next) => {

})

module.exports = router;