'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "secret-OSSIAN";

exports.authenticated = function(req, res, next){


    if(!req.headers.authenticated){
        return res.status(403).send({
            message: 'la petición no tiene cabecera de authorization'
        });
    }

    var token = req.headers.authenticated.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(403).send({
                message: 'El tojen ha expirado'
            });
        }
    }catch(ex){
        return res.status(403).send({
            message: 'el token no es válido'
        });
    }

    req.user = payload;
    
    next();
}