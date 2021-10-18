'use strict'

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/db');

class VersionImages extends Model{}

VersionImages.init({
    id :{
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    version_id : DataTypes.INTEGER,
    image_url : DataTypes.STRING,
    image_name : DataTypes.STRING
},{
    sequelize,
    modelName: 'version_images',
    tableName: 'version_images',
    timestamps: false
});

module.exports = VersionImages;