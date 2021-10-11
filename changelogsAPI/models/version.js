'use strict'

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/db');

class Version extends Model{}

Version.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    project_id : DataTypes.INTEGER,
    version_name : DataTypes.STRING,
    description : DataTypes.STRING,
    description_html : DataTypes.STRING,
    version_date : DataTypes.DATE,
    state : DataTypes.INTEGER,
    publisher : DataTypes.STRING,

},{
    sequelize,
    modelName: 'version',
    tableName: 'version',
    timestamps: false
});

module.exports = Version;