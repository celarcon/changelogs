'use strict'

var validator = require('validator');
var Version = require('../models/version');
const Image = require('../models/version_images');
const sequelize = require('../database/db');
const fs = require('fs');
const path = require('path');

var controller = {

    createVersion: async function (req, res) {

        var params = req.body;
        var idProject = req.params.idProject;

        try {
            var validator_project_id = validator.isEmpty(idProject);
            var validator_version_name = validator.isEmpty(params.version_name);
            var validator_description = validator.isEmpty(params.description);
            var validator_description_html = validator.isEmpty(params.description_html);
            var validator_version_date = validator.isEmpty(params.version_date);
            var validator_state = validator.isEmpty(params.state);
            var validator_publisher = validator.isEmpty(params.publisher);

            if (validator_project_id && validator_version_name && validator_description && validator_state
                && validator_description_html && validator_version_date && validator_publisher) {
                return res.status(200).send({
                    message: 'faltan datos'
                });
            }
            var version = new Version();

            version.project_id = idProject;
            version.version_name = params.version_name;
            version.description = params.description;
            version.description_html = params.description_html;
            version.version_date = params.version_date;
            version.state = params.state;
            version.publisher = params.publisher;

            await version.save().then(function (versionCreate) {
                if (versionCreate) {
                    return res.status(200).send({
                        message: "Versión creada correctamente",
                        res: versionCreate
                    });
                } else {
                    return res.status(200).send({
                        message: "Versión no creada",
                    });
                }

            }, function (err) {
                return res.status(200).send({
                    message: "Upss! hubo un error al crear la versión",
                    res: err
                });
            });

        } catch (err) {
            return res.status(200).send({
                message: 'faltan datos por entregar'
            });
        }
    },

    getVersions: async function (req, res) {

        var idProject = req.params.idProject;

        await Version.findAll(
            {
                where: {
                    project_id: idProject
                }
            }
        ).then(function (versions) {
            if (versions) {
                return res.status(200).send({
                    message: "Versiones obtenidas correctamente",
                    res: versions
                });
            } else {
                return res.status(200).send({
                    message: "Versiones no encontrados",
                });
            }

        }, function (err) {
            return res.status(200).send({
                message: "Upss! hubo un error al abtener las versiones",
                res: err
            });
        });
    },

    getVersion: async function (req, res) {

        var idVersion = req.params.idVersion;
        var idProject = req.params.idProject;

        await Version.findOne({
            where: {
                id: idVersion,
                project_id: idProject
            }
        }).then(function (version) {
            if (version) {
                return res.status(200).send({
                    message: "Versión obtenida correctamente",
                    res: version
                });
            } else {
                return res.status(200).send({
                    message: "Versión no existe",
                });
            }
        }, function (err) {
            return res.status(200).send({
                message: "Upss! hubo un error al obtener la versión",
                res: err
            });
        });
    },

    updateVersion: async function (req, res) {

        var idVersion = req.params.idVersion;
        var params = req.body;

        await Version.findOne({
            where: {
                id: idVersion
            }
        }).then(async function (version) {
            if (version) {

                if (!validator.isEmpty(params.version_name)) {
                    version.version_name = params.version_name;
                }
                if (!validator.isEmpty(params.description)) {
                    version.description = params.description;
                }
                if (!validator.isEmpty(params.description_html)) {
                    version.description_html = params.description_html;
                }
                console.log(params.version_date);
                if (!validator.isEmpty(params.version_date)) {
                    version.version_date = params.version_date;
                }
                if (params.state == 0 || params.state == 1) {
                    version.state = params.state;
                }
                if (!validator.isEmpty(params.publisher)) {
                    version.publisher = params.publisher;
                }

                await Version.update(
                    {
                        version_name: version.version_name,
                        description: version.description,
                        description_html: version.description_html,
                        version_date: version.version_date,
                        state: version.state,
                        publisher: version.publisher,
                    },
                    { where: { id: idVersion } }
                ).then(async function (version) {
                    if (version) {
                        return res.status(200).send({
                            message: "Versión actualizada correctamente",
                            res: version
                        });
                    } else {
                        return res.status(200).send({
                            message: "Versión no actualizada",
                        });
                    }
                }, function (err) {
                    return res.status(200).send({
                        message: "Upss! hubo un error al actualizar la versión",
                        res: err
                    });
                });
            } else {
                return res.status(200).send({
                    message: "Versión no existe",
                });
            }
        }, function (err) {
            return res.status(200).send({
                message: "Upss! hubo un error al obtener la versión",
                res: err
            });
        });
    },

    deleteVersion: async function (req, res) {

        var idVersion = req.params.idVersion;

        await Version.destroy({ where: { id: idVersion } }).then(function (versionDelete) {
            return res.status(200).send({
                message: "Versión eliminado correctamente",
                res: versionDelete
            });
        }, function (err) {
            return res.status(200).send({
                message: "Upss! hubo un error al eliminar la version",
                res: err
            });
        });
    },

    uploadImageVersion: async function(req, res){

        var params = req.files;
        var idVersion = req.params.idVersion;

        

        
        var sqlQuerry ='INSERT INTO version_images ( version_id, image_url, image_name) VALUES';

        try{

            params.map((imageMap, index) => {
                let path = imageMap.path.replace(/\\/g, "\\\\");
                console.log(path);
                sqlQuerry += '('+idVersion+',"'+path+'", "'+imageMap.filename +'")';
                if(index != params.length-1){
                    sqlQuerry +=',';
                }
            });
            console.log(sqlQuerry);

            await sequelize.query(sqlQuerry, { type: sequelize.QueryTypes.INSERT }).then( images => {
                return res.status(200).send({
                    message: "Imagenes subidas correctamente",
                    res: images
                });
            }, function (err) {
                return res.status(500).send({
                    message: "Upss! hubo un error al subir las imagenes",
                    res: err
                });
            });
                           
        }catch(err){
            return res.status(500).send({
                message: 'error',
                res: err
            });
        }
        
    },
    getImagesVersion:async function(req, res){

        var idVersion = req.params.idVersion;
        var idImage = req.params.idImage;

        await Image.findAll({
            where: {
                version_id: idVersion,
            }
        }).then(function (version) {
            if (version) {
                return res.status(200).send({
                    message: "Imagnes obtenidas correctamente",
                    res: version
                });
            } else {
                return res.status(200).send({
                    message: "Imagenes no existen",
                });
            }
        }, function (err) {
            return res.status(200).send({
                message: "Upss! hubo un error al obtener las imagenes",
                res: err
            });
        });
    },

    getImageVersion: async function(req, res){
        var fileName = req.params.fileName;
        var pathFile = './public/images/'+fileName;
        fs.exists(pathFile, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(pathFile));
            }else{
                return res.status(400).send({
                    message: 'La imagen no existe'
                })
            }
        });
    },

    deleteImageVersion: async function(req, res){

        var idImage = req.params.idImage;
        var idVersion = req.params.idVersion;

        await Image.findOne({ where: { id: idImage, version_id:idVersion } }).then( async result=>{
            console.log(result.image_url);
            await Image.destroy({ where: { id: idImage, version_id:idVersion } }).then( imageDelete => {
                console.log(result.image_url);
                fs.unlink(result.image_url).then(() => {
                    return res.status(200).send({
                        message: "Imagen eliminada correctamente",
                        res: imageDelete
                    });
                }).catch(err => {
                    return res.status(200).send({
                        message: "La imagen no se pudo eliminar",
                        res: imageDelete
                    });
                });
            }, function (err) {
                return res.status(200).send({
                    message: "Upss! hubo un error al eliminar la imagen",
                    res: err
                });
            });
        });

    }

};

module.exports = controller;