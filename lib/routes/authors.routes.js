'use strict'
const router = require('express').Router();
const authorsController = require('../controllers/authors.controller')


// Read authors list
router.get('/', authorsController.getAllAuthors)

// Create a new author
router.post('/', authorsController.createNewAuthor)

// Update an existing author
router.put('/:id', authorsController.updateAuthor)

// Delete an existing author
router.delete('/:id', authorsController.deleteAuthor)


module.exports = router