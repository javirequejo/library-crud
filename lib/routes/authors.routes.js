'use strict'
const router = require('express').Router();
const authorsService = require('../service/authors.service')


router.get('/', async (req, res, next) => {
    const authorsList = await authorsService.listAllAuthors()
    return res.status(200).json(authorsList)
});

module.exports = router;