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

            if(validator_version_id && validator_change_name && validator_description_html && validator_description_long){
                var versionChanges = new VersionChanges();

                versionChanges.version_id = params.version_id;
                versionChanges.change_name = params.change_name;
                versionChanges.description_html = params.description_html;
                versionChanges.description_long = params.description_long;

                await project.save().then(function(versionChangesCreate){
                    if(versionChangesCreate){
                        return res.status(200).send({
                            message: "Versiones creado correctamente",
                            res: versionChangesCreate
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

        await VersionChanges.findAll().then(function(versionChanges){
            if(versionChanges){
                return res.status(200).send({
                    message: "Versiones obtenidos correctamente",
                    res: versionChanges
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

        var idVersionChanges = req.params.id;

        await VersionChanges.findOne({
            where: {
              id: idVersionChanges
            }
          }).then(function(versionChanges){ 
            if(versionChanges){
                return res.status(200).send({
                    message: "Versión obtenida correctamente",
                    res: versionChanges
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

        var idVersionChanges = req.params.id;
        var params = req.body;
        
        await VersionChanges.update(
            { version_name: params.version_name },
            { where: { id: idVersionChanges } }
          ).then( async function(versionChanges){ 
            if(versionChanges){
                return res.status(200).send({
                    message: "Versión actualizado correctamente",
                    res: versionChanges
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

        var idVersionChanges = req.params.id;
       
        await VersionChanges.destroy({where: {id: idVersionChanges}}).then(function(versionChangesDelete){ 
            return res.status(200).send({
                message: "Versión eliminada correctamente",
                res: versionChangesDelete
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