'use strict'
const router = require('express').Router();
const formatsController = require('../controllers/formats.controller')


// Read formats list
router.get('/', formatsController.getAllFormats)

// Create a new format
router.post('/', formatsController.createNewFormat)

// Update an existing format
router.put('/:id', formatsController.updateFormat)

// Delete an existing format
router.delete('/:id', formatsController.deleteFormat)


module.exports = router