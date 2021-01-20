'use strict'
const router = require('express').Router();
const authorController = require('../controllers/author.controller')


// Read authors list
router.get('/', authorController.getAllAuthors)

// Create a new author
router.post('/', authorController.createNewAuthor)

// Update an existing author
router.put('/:id', authorController.updateAuthor)

// Delete an existing author
router.delete('/:id', authorController.deleteAuthor)


module.exports = router