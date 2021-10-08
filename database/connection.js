var mysql = require('mysql');

var conenection = mysql.createConnection({
    host:'localhost',
    database: 'changelogs',
    user:'root',
    password:''
});

module.exports = conenection;

/* PARA MYSQL SIN SEQUALIZE */