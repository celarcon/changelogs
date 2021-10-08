'use strict'

var controller = {
    
    createProject: function(req, res){
        return res.status(200).send({
            message: "ruta para crear proyectos"
        });
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