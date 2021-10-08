'use strict'

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/db');

class Project extends Model{}

Project.init({
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    project_name : DataTypes.STRING,
    company : DataTypes.STRING,
    state : DataTypes.INTEGER,
},{
    sequelize,
    modelName: 'project',
    tableName: 'project',
    timestamps: false
});

module.exports = Project;