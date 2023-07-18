'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Definir la asociación con los productos
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products',
      });
    }
  }

  Category.init(
    {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );

  return Category;
};
