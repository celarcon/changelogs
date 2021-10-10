'use strict'

var validator = require('validator');
var Version = require('../models/version');

var controller = {

    createVersion:async function(req, res){

        var params = req.body;

        try{
            var validator_project_id = !validator.isEmpty(params.project_id);
            var validator_version_name = !validator.isEmpty(params.version_name);
            var validator_description = !validator.isEmpty(params.description);
            var validator_description_html = !validator.isEmpty(params.description_html);
            var validator_version_date = !validator.isEmpty(params.version_date);
            var validator_state = !validator.isEmpty(params.state);
            var validator_publisher = !validator.isEmpty(params.publisher);

            if(validator_project_name && validator_company && validator_state){
                var project = new Version();

                project.project_name = params.project_name;
                project.company = params.company;
                project.state = params.state;

                await project.save().then(function(projectCreate){
                    if(projectCreate){
                        return res.status(200).send({
                            message: "Versión creada correctamente",
                            res: projectCreate
                        });    
                    }else{
                        return res.status(200).send({
                            message: "Versión no creada",
                        });    
                    } 
                
                }, function(err){
                    return res.status(200).send({
                        message: "Upss! hubo un error al crear la versión",
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
    
    getVersions: async function(req, res){

        await Version.findAll().then(function(projects){
            if(projects){
                return res.status(200).send({
                    message: "Versiones obtenidas correctamente",
                    res: projects
                });    
            }else{
                return res.status(200).send({
                    message: "Versiones no encontrados",
                });    
            } 
        
        }, function(err){
            return res.status(200).send({
                message: "Upss! hubo un error al abtener las versiones",
                res: err
            });   
        });
    },

    getVersion: async function(req, res){

        var idProject = req.params.id;

        await Version.findOne({
            where: {
              id: idProject
            }
          }).then(function(project){ 
            if(project){
                return res.status(200).send({
                    message: "Versión obtenida correctamente",
                    res: project
                });    
            }else{
                return res.status(200).send({
                    message: "Versión no existe",
                });    
            } 
        }, function(err){
            return res.status(200).send({
                message: "Upss! hubo un error al obtener la versión",
                res: err
            });   
        });
    },

    updateVersion: async function(req, res){

        var idProject = req.params.id;
        var params = req.body;
        
        await Version.update(
            { project_name: params.project_name },
            { where: { id: idProject } }
          ).then( async function(project){ 
            if(project){
                return res.status(200).send({
                    message: "Versión actualizada correctamente",
                    res: project
                });    
            }else{
                return res.status(200).send({
                    message: "Versión no actualizada",
                });    
            } 
        }, function(err){
            return res.status(200).send({
                message: "Upss! hubo un error al actualizar la versión",
                res: err
            });   
        });
    },

    deleteVersion: async function(req, res){

        var idProject = req.params.id;
       
        await Version.destroy({where: {id: idProject}}).then(function(projectDelete){ 
            return res.status(200).send({
                message: "Versión eliminado correctamente",
                res: projectDelete
        });    
        }, function(err){
            return res.status(200).send({
                message: "Upss! hubo un error al eliminar la version",
                res: err
            });   
        });
    }

};

module.exports = controller;