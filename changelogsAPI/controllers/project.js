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

                await project.save().then(function(projectCreate){
                    if(projectCreate){
                        return res.status(200).send({
                            message: "Proyecto creado correctamente",
                            res: projectCreate
                        });    
                    }else{
                        return res.status(200).send({
                            message: "Proyecto no creado",
                        });    
                    } 
                
                }, function(err){
                    return res.status(200).send({
                        message: "Upss! hubo un error al crear el proyecto",
                        res: err
                    });   
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
    
    getProjects: async function(req, res){

        await Project.findAll().then(function(projects){
            if(projects){
                return res.status(200).send({
                    message: "Proyectos obtenidos correctamente",
                    res: projects
                });    
            }else{
                return res.status(200).send({
                    message: "Proyectos no encontrados",
                });    
            } 
        
        }, function(err){
            return res.status(200).send({
                message: "Upss! hubo un error al abtener los proyectos",
                res: err
            });   
        });
    },

    getProject: async function(req, res){

        var idProject = req.params.id;

        await Project.findOne({
            where: {
              id: idProject
            }
          }).then(function(project){ 
            if(project){
                return res.status(200).send({
                    message: "Proyecto obtenido correctamente",
                    res: project
                });    
            }else{
                return res.status(200).send({
                    message: "Proyecto no existe",
                });    
            } 
        }, function(err){
            return res.status(200).send({
                message: "Upss! hubo un error al obtener el proyecto",
                res: err
            });   
        });
    },

    updateProject: async function(req, res){

        var idProject = req.params.id;
        var params = req.body;
        
        console.log(idProject);
        console.log(params);
        
        await Project.findOne({
            where: {
              id: idProject
            }
          }).then( async function(project){ 
            if(project){
                if(!validator.isEmpty(params.project_name)){
                    project.project_name = params.project_name;
                }
                if(!validator.isEmpty(params.company)){
                    project.company = params.company;
                }
                if(params.state == 1 || params.state == 0){
                    project.state = params.state;
                }
                await Project.update(
                    {   project_name: project.project_name,
                        company: project.company,
                        state: project.state
                     },
                    { where: { id: idProject } }
                  ).then( async function(project){ 
                    if(project){
                        return res.status(200).send({
                            message: "Proyecto actualizado correctamente",
                            res: project
                        });    
                    }else{
                        return res.status(200).send({
                            message: "Proyecto no actualizado",
                        });    
                    } 
                }, function(err){
                    return res.status(200).send({
                        message: "Upss! hubo un error al actualizar el proyecto",
                        res: err
                    });   
                });
            }else{
                return res.status(200).send({
                    message: "Proyecto no existe",
                });    
            } 
        }, function(err){
            return res.status(200).send({
                message: "Upss! hubo un error al obtener el proyecto",
                res: err
            });   
        });
    },

    deleteProject: async function(req, res){

        var idProject = req.params.id;
       
        await Project.destroy({where: {id: idProject}}).then(function(projectDelete){ 
            return res.status(200).send({
                message: "proyecto eliminado correctamente",
                res: projectDelete
        });    
        }, function(err){
            return res.status(200).send({
                message: "Upss! hubo un error al eliminar el proyecto",
                res: err
            });   
        });
    }
};

module.exports = controller;