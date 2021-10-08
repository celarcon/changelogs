'use strict'

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/db');

class VersionChanges extends Model{}

VersionChanges.init({
    id :{
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    version_id : DataTypes.INTEGER,
    change_name : DataTypes.STRING,
    description_html : DataTypes.STRING,
    description_long : DataTypes.STRING
},{
    sequelize,
    modelName: 'version_changes',
    tableName: 'version_changes',
    timestamps: false
});

module.exports = VersionChanges;