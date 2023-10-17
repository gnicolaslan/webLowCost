'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {

    static associate(models) {
      // define association here
    }
  }
  Rol.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
  });
  return Rol;
};