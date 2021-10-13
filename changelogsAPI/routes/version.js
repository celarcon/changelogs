'use strict'

var express = require('express');
var VersionController = require('../controllers/version');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.get('/project/:idProject/version/:idVersion', VersionController.getVersion);
router.get('/project/:idProject/versions', VersionController.getVersions);
router.post('/project/:idProject/version/:idVersion', md_auth.authenticated, VersionController.createVersion);
router.put('/project/:idProject/version/:idVersion', md_auth.authenticated, VersionController.updateVersion);
router.delete('/project/:idProject/version/:idVersion', md_auth.authenticated, VersionController.deleteVersion);

module.exports = router;