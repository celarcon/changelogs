'use strict'

var validator = require('validator');
var VersionChanges = require('../models/version_changes');

var controller = {

    createVersionChanges:async function(req, res){

        var params = req.body;

        try{
            var validator_version_id = !validator.isEmpty(params.version_id);
            var validator_change_name = !validator.isEmpty(params.change_name);
            var validator_description_html = !validator.isEmpty(params.description_html);
            var validator_description_long = !validator.isEmpty(params.description_long);

            if(validator_project_name && validator_company && validator_state){
                var project = new VersionChanges();

                project.project_name = params.project_name;
                project.company = params.company;
                project.state = params.state;

                await project.save().then(function(projectCreate){
                    if(projectCreate){
                        return res.status(200).send({
                            message: "Versiones creado correctamente",
                            res: projectCreate
                        });    
                    }else{
                        return res.status(200).send({
                            message: "Versiones no creado",
                        });    
                    } 
                
                }, function(err){
                    return res.status(200).send({
                        message: "Upss! hubo un error al eliminar la versión",
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
    
    getVersionsChanges: async function(req, res){

        await VersionChanges.findAll().then(function(version){
            if(version){
                return res.status(200).send({
                    message: "Versiones obtenidos correctamente",
                    res: version
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

    getVersionChange: async function(req, res){

        var idVersion = req.params.id;

        await VersionChanges.findOne({
            where: {
              id: idVersion
            }
          }).then(function(version){ 
            if(version){
                return res.status(200).send({
                    message: "Versión obtenida correctamente",
                    res: version
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

    updateVersionChanges: async function(req, res){

        var idVersion = req.params.id;
        var params = req.body;
        
        await VersionChanges.update(
            { project_name: params.project_name },
            { where: { id: idVersion } }
          ).then( async function(version){ 
            if(version){
                return res.status(200).send({
                    message: "Versión actualizado correctamente",
                    res: version
                });    
            }else{
                return res.status(200).send({
                    message: "Versión no actualizar",
                });    
            } 
        }, function(err){
            return res.status(200).send({
                message: "Upss! hubo un error al actualizar la Versión",
                res: err
            });   
        });
    },

    deleteVersionChanges: async function(req, res){

        var idVersion = req.params.id;
       
        await VersionChanges.destroy({where: {id: idVersion}}).then(function(versionDelete){ 
            return res.status(200).send({
                message: "Versión eliminada correctamente",
                res: versionDelete
        });    
        }, function(err){
            return res.status(200).send({
                message: "Upss! hubo un error al eliminar la lersión",
                res: err
            });   
        });
    }

};

module.exports = controller;