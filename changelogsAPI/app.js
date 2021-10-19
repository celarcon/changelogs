'use strict'

//Requires
const express = require('express');
const multer = require('multer');
var path = require('path')

//Ejecutar express
var app = express();

//Cargar archivos de rutas
var user_routes = require('./routes/user');
var project_routes = require('./routes/project');
var version_routes = require('./routes/version');
var version_changes_routes = require('./routes/version_changes');

//MULTER
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

//Middleweres
app.use(multer({ dest: 'public/images', storage:storage}).any('image'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Reescribir rutas
app.use('/api', user_routes);
app.use('/api', project_routes);
app.use('/api', version_routes);
app.use('/api', version_changes_routes); 

//Exportar
module.exports = app;