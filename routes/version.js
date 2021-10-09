'use strict'

var express = require('express');
var VersionController = require('../controllers/version');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.get('/getVersion/:id', VersionController.getVersion);
router.get('/getVersions', VersionController.getVersions);
router.post('/createVersion', md_auth.authenticated, VersionController.createVersion);
router.put('/updateVersion/:id', VersionController.updateVersion);
router.delete('/deleteVersion/:id', VersionController.deleteVersion);

module.exports = router;