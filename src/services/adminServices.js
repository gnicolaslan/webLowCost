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
                name, precio, discount, description, brandId, categoryId, stock, cuota, visible
            } = body
            const newProduct = await db.Product.create({
                name : name,
                price : +precio,
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
    }
}