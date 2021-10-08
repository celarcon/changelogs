'use strict'

var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

var controller = {

    save: async function(req, res) {
        // recogemos parametros 
        var params = req.body;

        //Validamos datos
        var validate_name = !validator.isEmpty(params.name);
        var validate_password = !validator.isEmpty(params.password);

        if(validate_name && validate_password){
            //Crear objeto usuario
            var user = new User();
            user.name = params.name;
            user.password = params.password;

            //comprobar si existe
            const issetUser = await User.findOne({ where: { name: user.name } });

            if(issetUser == null){
                bcrypt.hash(params.password, null, null, (err, hash)=>{
                    user.password = hash;
                    User.create({name: user.name, password: user.password});
                    return res.status(200).send({
                        message : user
                    });
                });
            }else{
                return res.status(500).send({
                    message: "el usuario ya exite"
                });
            }

        }else{
            return res.status(200).send({
                message: "Faltan datos"
            });
        }
    },
    login: async function(req, res){

        var params = req.body;

        var validate_name = !validator.isEmpty(params.name);
        var validate_password = !validator.isEmpty(params.password);
    
        if(!validate_name || !validate_name){
            return  res.status(500).send({
                message: "Los datos son incorrectos"
            });
        }else{
            const user = await User.findOne({ where: { name: params.name } });

            if(user == null){
                return  res.status(500).send({
                    message: "error al identificarse"
                });
            }else{

                bcrypt.compare(params.password, user.password, (err, check) =>{
                    if(check){
                        return  res.status(500).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        return  res.status(500).send({
                            message: "Las credenciales son incorrectas"
                        });
                    }
                });
            }
        }
    }

};

module.exports = controller;