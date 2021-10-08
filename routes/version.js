'use strict'

var express = require('express');
var VersionController = require('../controllers/version');

var router = express.Router();

router.post('/', VersionController);

module.exports = router;