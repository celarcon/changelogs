'use strict'

var express = require('express');
var VersionChangesController = require('../controllers/version_changes');

var router = express.Router();

router.post('/', VersionChangesController);

module.exports = router;