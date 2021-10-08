'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

router.get('/getProjects', ProjectController.getProjects);
router.post('/createProjects', ProjectController.createProject);
router.put('/updateProject', ProjectController.updateProject);

module.exports = router;