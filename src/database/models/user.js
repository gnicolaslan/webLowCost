'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Relación con la tabla de Direcciones
      User.belongsTo(models.Address, {
        foreignKey: 'addressId',
        as: 'address',
        onDelete: 'cascade'
      });

      // Relación con la tabla de Roles
      User.belongsTo(models.Rol, {
        foreignKey: 'rolId',
        as: 'rol'
      });

      // Relación con la tabla de Ordenes
      User.hasMany(models.Order, {
        foreignKey: 'userId',
        as: 'orders',
        onDelete: 'cascade'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    checked: { type: DataTypes.BOOLEAN, defaultValue: false },
    phone: DataTypes.INTEGER,
    dni: DataTypes.INTEGER,
    email: DataTypes.STRING,
    resetCode: DataTypes.STRING,
    rolId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    shopping: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};