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
      priceUSD: DataTypes.INTEGER, 
      description: DataTypes.TEXT,
      brandId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      offer: DataTypes.BOOLEAN,
      visible: DataTypes.BOOLEAN,
      imageUrls: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  return Product;
};
