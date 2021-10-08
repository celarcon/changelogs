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

/* Para MYSQL sin sequelize */

/* conenection.connect(function(err){
    if(err){
        throw err;
    }else{
        app.listen(port,() => {
            console.log('el servidor esta funcionando');
        });
    }
}); */

/* conenection.query('SELECT * FROM project', function(err, res, req){
    if(err){
        throw err;
    }else{
        res.forEach(result => {
            console.log(result);
        });
    }
}); */

/* conenection.end(); */