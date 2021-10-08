'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        iat: moment().unix(),
        exp: moment().add(5,'days').unix()
    };

    return jwt.encode(payload, 'secret-OSSIAN');
};