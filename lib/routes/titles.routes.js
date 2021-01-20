'use strict'
const router = require('express').Router();
const titlesService = require('../service/titles.service')


router.get('/', async (req, res, next) => {
    const titlesList = await titlesService.listAllTitles()
    return res.status(200).json(titlesList)
});

module.exports = router;