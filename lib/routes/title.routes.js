'use strict'
const router = require('express').Router();
const titleService = require('../services/title.service')

// Read titles list
router.get('/', async (req, res, next) => {
    const titlesList = await titleService.listAllTitles()
    return res.status(200).json(titlesList)
});

// Create a new title
router.post('/', async (req, res, next) => {

})

// Update an existing title
router.put('/:id', async (req, res, next) => {

})

// Delete an existing title
router.delete('/:id', async (req, res, next) => {

})

module.exports = router;