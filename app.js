'use strict'

//Requires
var express = require('express');

//Ejecutar express
var app = express();
const sequelize = require('./database/db');

//Cargar archivos de rutas
// const Project = require('./models/project');
var user_routes = require('./routes/user');
var project_routes = require('./routes/project');
/* var version_routes = require('./routes/version');
var version_changes_routes = require('./routes/version_changes'); */

//Middleweres
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS

/* Pruebas */

/* app.get('/', (req, res)=>{
    sequelize.query("SELECT * from project").then(results => {
        res.status(200).send({
            message: results
        });
    }).catch( err =>{
        res.status(500).send(err);
    });
});

app.get('/sequelize', (req, res)=>{
    Project.findAll().then(users => {
        res.json(users);
    });
}); */

//Reescribir rutas
app.use('/api', user_routes);
app.use('/api', project_routes);
/* app.use('/api', version_routes);
app.use('/api', version_changes_routes); */

//Exportar
module.exports = app;