'use strict'

var express = require('express');
var VersionChangesController = require('../controllers/version_changes');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.get('/getVersionChanges/:id', VersionChangesController.getVersionChange);
router.get('/getVersionsChanges', VersionChangesController.getVersionsChanges);
router.post('/createVersionChanges', md_auth.authenticated, VersionChangesController.createVersionChanges);
router.put('/updateVersionChanges/:id', md_auth.authenticated, VersionChangesController.updateVersionChanges);
router.delete('/deleteVersionChanges/:id', md_auth.authenticated, VersionChangesController.deleteVersionChanges);

module.exports = router;