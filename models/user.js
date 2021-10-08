'use strict'

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/db');

class User extends Model{}

User.init({
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : DataTypes.STRING,
    password : DataTypes.STRING
},{
    sequelize,
    modelName: 'user',
    tableName: 'user',
    timestamps: false
});

module.exports = User;