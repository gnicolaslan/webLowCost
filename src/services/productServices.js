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
                    {
                        association: 'images',
                        attributes: ['name']
                    }
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
            const product = await db.Product.findAll({

                include: [
                    {
                        association: 'images',
                        attributes: ['name']
                    }
                ],
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
                }
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
            const products = db.Product.findAll({
                include: {
                    association: 'images',
                    attributes: ['name']
                },
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
            const products = db.Product.findAll({
                include: {
                    association: 'images',
                    attributes: ['name']
                },
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

    getProductsByOffer: async () => {
        try {
            const products = await db.Product.findAll({
                include: {
                    association: 'images',
                    attributes: ['name']
                },
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
            const brands = await db.Brand.findAll()

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
    }
}