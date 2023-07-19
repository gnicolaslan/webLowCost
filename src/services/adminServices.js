const db = require("../database/models");

module.exports = {
    getAllUsers : async () => {
        try {
            const users = await db.User.findAll();

            return users
        } catch (error) {
            throw {
                status: error.status || 500,
                message: error.message,
              };
        }
    },
    getAllProducts : async () => {
        try {
            const products = await db.Product.findAll();

            return products
        } catch (error) {
            throw {
                status: error.status || 500,
                message: error.message,
              };
        }
    },
    createNewProduct : async (body) => {
        try {

            const {
                name, price, discount, description, brandId, categoryId, stock, cuota, visible
            } = body
            const newProduct = await db.Product.create({
                name : name,
                price : +price,
                discount : discount,
                description : description,
                brandId : +brandId,
                categoryId : +categoryId,
                stock : +stock,
                cuota : +cuota,
                visible : visible
            })

            return newProduct
            
        } catch (error) {
            throw {
                status: error.status || 500,
                message: error.message,
              };
        }
    },
    deleteProduct : async (id) => {
        try {
            const product = await db.Product.findByPk(id,{
                include: [{ model: db.Image, as: 'images' }]
            })
            await product.destroy()
        } catch (error) {
            throw {
                status: error.status || 500,
                message: error.message,
              };
        }
    }
}