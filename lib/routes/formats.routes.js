'use strict'
const router = require('express').Router();
const formatsService = require('../service/formats.service')


router.get('/', async (req, res, next) => {
    const formatsList = await formatsService.listAllFormats()
    return res.status(200).json(formatsList)
});

module.exports = router;