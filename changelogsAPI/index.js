'use strict'

var conenection = require('./database/connection');
const app = require('./app');
const sequelize = require('./database/db');

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    sequelize.authenticate().then(()=>{
        console.log('conectado');
    }).catch(err=>{
        console.log(err);
    })
});