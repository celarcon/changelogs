'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.get('/getProjects', ProjectController.getProjects);
router.post('/createProjects', md_auth.authenticated, ProjectController.createProject);
router.put('/updateProject', ProjectController.updateProject);
router.delete('/deleteProject/:id', ProjectController.deleteProject);

module.exports = router;