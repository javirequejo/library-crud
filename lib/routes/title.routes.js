'use strict'
const router = require('express').Router();
const titleController = require('../controllers/title.controller')


// Read titles list
router.get('/', titleController.getAllTitles)

// Create a new title
router.post('/', titleController.createNewTitle)

// Update an existing title
router.put('/:id', titleController.updateTitle)

// Delete an existing title
router.delete('/:id', titleController.deleteTitle)


module.exports = router