const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
    getOneProduct: async (id) => {
        try {
            const product = await db.Product.findByPk(id, {
                include: [
                    {
                        association: 'category',
                        attributes: ['id', 'name'],
                    },
                ]
            });
            return product
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },

    getProductByKeyword: async (keyword) => {
        try {
            let options = [
                {
                    association: 'category',
                    attributes: ['name'],
                },
                {
                    association: 'brand',
                    attributes: ['name'],
                },
            ]
            const product = await db.Product.findAll({

                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.substring]: `%${keyword}%`
                            }
                        },
                        {
                            description: {
                                [Op.substring]: `%${keyword}%`
                            }
                        }
                    ]
                },
                include: options, 
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'weight', 'width', 'brandId', 'categoryId','height','length'],
                },
            });
            return product
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },

    getProductsByCategory: async (category) => {
        try {
            const products = await db.Product.findAll({

                where: { categoryId: category }
            })
            return products
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },

    getProductsByBrand: async (brand) => {
        try {
            const products = await db.Product.findAll({

                where: { brandId: brand }
            })
            return products
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    getLastProductInDB: async () => {
        try {
          const lastProduct = await db.Product.findOne({
            order: [
                ['createdAt','DESC']
            ],
          });
          return lastProduct;
        } catch (error) {
          throw {
            status: 500,
            message: error.message,
          };
        }
      },

    getProductsByOffer: async () => {
        try {
            const products = await db.Product.findAll({

                where: { offer: true }
            });


            if (!products || products.length === 0) {
                return [];
            }

            return products;
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            };
        }
    },

    getAllBrands: async () => {
        try {
            const brands = await db.Brand.findAll({
                attributes: ['id', 'name', 'image', 'createdAt', 'updatedAt'],
            });

            return brands
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },

    getAllCategories: async () => {
        try {
            const categories = await db.Category.findAll()

            return categories
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },

    updateProductPricesByCategory: async (categoryId, updateValue, isPercentage) => {
        try {
          const category = await db.Category.findByPk(categoryId, {
            include: {
              model: db.Product,
              as: 'products', 
            },
          });
      
          if (!category) {
            throw {
              status: 404,
              message: "Category not found.",
            };
          }
      
          const updatedProducts = await Promise.all(
            category.products.map(async (product) => {
              let newPrice;
      
              if (isPercentage) {
                newPrice = product.price + product.price * (updateValue / 100);
              } else {
                newPrice = updateValue;
              }
      
              await product.update({ price: newPrice });
              return product;
            })
          );
      
          return updatedProducts;
        } catch (error) {
          throw {
            status: 500,
            message: error.message,
          };
        }
      },
      
}