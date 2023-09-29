const db = require("../database/models");
const createResponseError = require("../helpers/createResponseError");
const {
  getAllUsers,
  getAllProducts,
  createNewProduct,
  deleteProduct,
  productToEdit,
  editProduct,
} = require("../services/adminServices");
const { Op } = require('sequelize');



module.exports = {
  showListUsers: async (req, res) => {
    try {
      const users = await getAllUsers();

      return res.status(200).json({
        ok: true,
        data: users,
        meta: {
          status: 200,
          total: users.length,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  showListProducts: async (req, res) => {
    try {
      const products = await getAllProducts();

      return res.status(200).json({
        ok: true,
        data: products,
        meta: {
          status: 200,
          total: products.length,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  createProduct: async (req, res) => {
    try {
      /*             if (!req.files || !req.files.imageFile) {
                            return res.status(400).send('No se han subido archivos.');
                        } */

      const { body } = req;

      // Convierte 'offer' y 'visible' a booleanos
      body.offer = body.offer === true;
      body.visible = body.visible === true;
      const newProduct = await createNewProduct(req.body, req.files);

      if (newProduct) {
        return res.status(200).json({
          ok: true,
          data: newProduct,
          meta: {
            status: 200,
            url: `/api/product/detail/${newProduct.id}`,
          },
        });
      } else {
        throw {
          status: 500,
          message: "Error al crear el producto",
        };
      }
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await deleteProduct(id);

      return res.status(200).json({
        ok: true,
        message: "Product deleted with sucess",
        meta: {
          status: 200,
          total: 1,
        },
        data: {
          deletedProduct,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  getEditProduct: async (req, res) => {
    try {
      const product = await productToEdit(req.params.id);

      return res.status(200).json({
        ok: true,
        data: product,
        meta: {
          status: 200,
          total: 1,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  saveEditProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const saveProduct = await editProduct(req.body, id);

      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
          total: 1,
          url: `/api/products/${id}`,
        },
        data: {
          editedProduct: saveProduct,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  editProductPrice: async (req, res) => {
    try {
      const { startId, endId, newPrice } = req.body;

      const parsedStartId = parseInt(startId);
      const parsedEndId = parseInt(endId);
      const parsedNewPrice = parseInt(newPrice); 

      if (isNaN(parsedStartId) || isNaN(parsedEndId) || isNaN(parsedNewPrice)) {
        throw {
          status: 400,
          message: "startId, endId, and newPrice must be valid numbers.",
        };
      }
      console.log(parsedStartId,parsedEndId,parsedNewPrice);

      const updatedProducts = await db.Product.update(
        { price: parsedNewPrice },
        {
          where: {
            id: { [Op.between]: [parsedStartId, parsedEndId] },
        },
        }
      );

      return res.status(200).json({
        ok: true,
        message: "Prices updated successfully.",
        meta: {
          status: 200,
          total: updatedProducts,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
};
