'use strict'

var express = require('express');
var VersionChangesController = require('../controllers/version_changes');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.get('/project/:idProject/version/:idVersion/versionsChanges', VersionChangesController.getVersionsChanges);
router.get('/project/:idProject/version/:idVersion/versionChange/:idVersionChange', VersionChangesController.getVersionChange);
router.post('/createVersionChanges', md_auth.authenticated, VersionChangesController.createVersionChanges);
router.put('/updateVersionChanges/:id', md_auth.authenticated, VersionChangesController.updateVersionChanges);
router.delete('/deleteVersionChanges/:id', md_auth.authenticated, VersionChangesController.deleteVersionChanges);

module.exports = router;