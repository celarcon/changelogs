'use strict'

var express = require('express');
var VersionChangesController = require('../controllers/version_changes');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.get('/project/:idProject/version/:idVersion/versionsChanges', VersionChangesController.getVersionsChanges);
router.get('/project/:idProject/version/:idVersion/versionChange/:idVersionChange', VersionChangesController.getVersionChange);
router.post('/project/:idProject/version/:idVersion/versionChanges', md_auth.authenticated, VersionChangesController.createVersionChanges);
router.put('/project/:idProject/version/:idVersion/versionChanges/:idVersionChange', md_auth.authenticated, VersionChangesController.updateVersionChanges);
router.delete('/project/:idProject/version/:idVersion/versionChanges/:idVersionChange', md_auth.authenticated, VersionChangesController.deleteVersionChanges);

module.exports = router;