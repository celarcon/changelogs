'use strict'

var validator = require('validator');
var Project = require('../models/project');

var controller = {
    
    createProject:async function(req, res){

        var params = req.body;

        try{
            var validator_project_name = !validator.isEmpty(params.project_name);
            var validator_company = !validator.isEmpty(params.company);
            var validator_state = !validator.isEmpty(params.state);

            if(validator_project_name && validator_company && validator_state){
                var project = new Project();

                project.project_name = params.project_name;
                project.company = params.company;
                project.state = params.state;

                console.log(project.state);
                
                var response = await project.save();
                
                return res.status(200).send({
                    message: response
                });

            }else{
                return res.status(200).send({
                    message: 'faltan datos'
                });
            }

        }catch(err){
            return res.status(200).send({
                message: 'faltan datos por entregar'
            });
        }
    },
    getProjects: function(req, res){
        return res.status(200).send({
            message: "ruta que me devulve los proyectos"
        });
    },
    updateProject: function(req, res){
        return res.status(200).send({
            message: "ruta que edita los proyectos"
        });
    }
};

module.exports = controller;