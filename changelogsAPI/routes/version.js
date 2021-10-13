'use strict'

var express = require('express');
var VersionController = require('../controllers/version');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.get('/project/:idProject/version/:idVersion', VersionController.getVersion);
router.get('/project/:idProject/versions', VersionController.getVersions);
router.post('/createVersion', md_auth.authenticated, VersionController.createVersion);
router.put('/updateVersion/:idVersion', md_auth.authenticated, VersionController.updateVersion);
router.delete('/deleteVersion/:idVersion', md_auth.authenticated, VersionController.deleteVersion);

module.exports = router;