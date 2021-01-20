'use strict'
const router = require('express').Router();
const formatController = require('../controllers/format.controller')


// Read formats list
router.get('/', formatController.getAllFormats)

// Create a new format
router.post('/', formatController.createNewFormat)

// Update an existing format
router.put('/:id', formatController.updateFormat)

// Delete an existing format
router.delete('/:id', formatController.deleteFormat)


module.exports = router