'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Relación con la tabla de Categorías
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });

      // Relación con la tabla de Marcas
      Product.belongsTo(models.Brand, {
        foreignKey: 'brandId',
        as: 'brand',
      });

      // Relación con la tabla de Imagenes
      Product.hasMany(models.Image, {
        as: 'images',
        foreignKey: 'productId',
        onDelete: 'cascade'
      });

      // Relación con la tabla de Ordenes
      Product.belongsToMany(models.Order, {
        foreignKey: 'productId',
        otherKey: 'orderId',
        through: 'Cart',
        as: 'cart'
      });
    }
  }

  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      discount: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      brandId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      cuota: DataTypes.INTEGER,
      visible: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  return Product;
};
