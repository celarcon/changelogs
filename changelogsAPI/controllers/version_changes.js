'use strict'

var validator = require('validator');
var VersionChanges = require('../models/version_changes');

var controller = {

    createVersionChanges: async function (req, res) {

        var params = req.body;
        var idVersion = req.params.idVersion;

        try {
            var validator_version_id = validator.isEmpty(idVersion);
            var validator_change_name = validator.isEmpty(params.change_name);
            var validator_description_html = validator.isEmpty(params.description_html);
            var validator_description_long = validator.isEmpty(params.description_long);


            if (validator_version_id && validator_change_name && validator_description_html && validator_description_long) {
                return res.status(200).send({
                    message: 'faltan datos'
                });
            }
            var versionChanges = new VersionChanges();

            versionChanges.version_id = idVersion;
            versionChanges.change_name = params.change_name;
            versionChanges.description_html = params.description_html;
            versionChanges.description_long = params.description_long;

            await versionChanges.save().then(function (versionChangesCreate) {
                if (versionChangesCreate) {
                    return res.status(200).send({
                        message: "Cambios en versiones creado correctamente",
                        res: versionChangesCreate
                    });
                } else {
                    return res.status(200).send({
                        message: "Cambios en versiones no creado",
                    });
                }

            }, function (err) {
                return res.status(200).send({
                    message: "Upss! hubo un error al eliminar el cambio versión",
                    res: err
                });
            });


        } catch (err) {
            return res.status(200).send({
                message: 'faltan datos por entregar',
                error: err
            });
        }
    },

    getVersionsChanges: async function (req, res) {

        var idProject = req.params.idProject;
        var idVersion = req.params.idVersion;

        await VersionChanges.findAll(
            {
                where: {
                    version_id: idVersion
                }
            }
        ).then(function (versionChanges) {
            if (versionChanges) {
                return res.status(200).send({
                    message: "Cambios en versiones obtenidos correctamente",
                    res: versionChanges
                });
            } else {
                return res.status(200).send({
                    message: "Cambios en versiones no encontrados",
                });
            }

        }, function (err) {
            return res.status(200).send({
                message: "Upss! hubo un error al abtener las Cambios en versiones",
                res: err
            });
        });
    },

    getVersionChange: async function (req, res) {

        var idVersionChanges = req.params.idVersionChanges;

        await VersionChanges.findOne({
            where: {
                id: idVersionChanges
            }
        }).then(function (versionChanges) {
            if (versionChanges) {
                return res.status(200).send({
                    message: "Cambios en versión obtenida correctamente",
                    res: versionChanges
                });
            } else {
                return res.status(200).send({
                    message: "Cambios en versión no existe",
                });
            }
        }, function (err) {
            return res.status(200).send({
                message: "Upss! hubo un error al obtener la Cambios en versión",
                res: err
            });
        });
    },

    updateVersionChanges: async function (req, res) {

        var idVersionChanges = req.params.idVersionChanges;
        var params = req.body;

        await VersionChanges.findOne({
            where: {
                id: idVersionChanges
            }
        }).then(async function (versionChanges) {
            if (versionChanges) {

                if (!validator.isEmpty(params.change_name)) {
                    versionChanges.change_name = params.change_name;
                }
                if (!validator.isEmpty(params.description_html)) {
                    versionChanges.description_html = params.description_html;
                }
                if (!validator.isEmpty(params.description_long)) {
                    versionChanges.description_long = params.description_long;
                }

                await VersionChanges.update(
                    {
                        change_name: versionChanges.change_name,
                        description_html: versionChanges.description_html,
                        description_long: versionChanges.description_long
                    },
                    { where: { id: idVersionChanges } }
                ).then(async function (versionChanges) {
                    if (versionChanges) {
                        return res.status(200).send({
                            message: "Cambios en versión actualizado correctamente",
                            res: versionChanges
                        });
                    } else {
                        return res.status(200).send({
                            message: "Cambios en versión no actualizado",
                        });
                    }
                }, function (err) {
                    return res.status(200).send({
                        message: "Upss! hubo un error al actualizar la Cambios en versión",
                        res: err
                    });
                });
            } else {
                return res.status(200).send({
                    message: "Cambios en versión no existe",
                });
            }
        }, function (err) {
            return res.status(200).send({
                message: "Upss! hubo un error al obtener la Cambios en versión",
                res: err
            });
        });
    },

    deleteVersionChanges: async function (req, res) {

        var idVersionChanges = req.params.idVersionChanges;

        await VersionChanges.destroy({ where: { id: idVersionChanges } }).then(function (versionChangesDelete) {
            return res.status(200).send({
                message: "Cambios en versión eliminada correctamente",
                res: versionChangesDelete
            });
        }, function (err) {
            return res.status(200).send({
                message: "Upss! hubo un error al eliminar el cambio en versión",
                res: err
            });
        });
    }

};

module.exports = controller;