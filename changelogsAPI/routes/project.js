'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');
var md_auth = require('../middlewares/authenticated');

var router = express.Router();

router.get('/project/:id', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.post('/createProject', md_auth.authenticated, ProjectController.createProject);
router.put('/updateProject/:id', md_auth.authenticated, ProjectController.updateProject);
router.delete('/deleteProject/:id', md_auth.authenticated, ProjectController.deleteProject);

module.exports = router;