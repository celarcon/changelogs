'use strict'

var express = require('express');
var VersionController = require('../controllers/version');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.get('/project/:idProject/version/:idVersion', VersionController.getVersion);
router.get('/project/:idProject/versions', VersionController.getVersions);
router.get('/project/:idProject/version/:idVersion/images', VersionController.getImagesVersion);
router.get('/project/:idProject/version/:idVersion/image/:fileName', VersionController.getImageVersion);
router.post('/project/:idProject/version', md_auth.authenticated, VersionController.createVersion);
router.post('/project/:idProject/version/:idVersion/uploadImage', md_auth.authenticated, VersionController.uploadImageVersion);
router.put('/project/:idProject/version/:idVersion', md_auth.authenticated, VersionController.updateVersion);
router.delete('/project/:idProject/version/:idVersion', md_auth.authenticated, VersionController.deleteVersion);
router.delete('/project/:idProject/version/:idVersion/uploadImage/:idImage', md_auth.authenticated, VersionController.deleteImageVersion);

module.exports = router;