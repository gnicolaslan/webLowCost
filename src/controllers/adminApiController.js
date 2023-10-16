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
const { Op } = require("sequelize");
const {
  updateProductPricesByCategory,
} = require("../services/productServices");
const fs = require("fs");
const path = require("path");

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
      const { body } = req;
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
      const { startId, endId, updateValue, isPercentage } = req.body;

      const parsedStartId = parseInt(startId);
      const parsedEndId = parseInt(endId);
      const parsedUpdateValue = parseFloat(updateValue);

      if (
        isNaN(parsedStartId) ||
        isNaN(parsedEndId) ||
        isNaN(parsedUpdateValue)
      ) {
        throw {
          status: 400,
          message: "startId, endId, and updateValue must be valid numbers.",
        };
      }

      const productsToUpdate = await db.Product.findAll({
        where: {
          id: { [Op.between]: [parsedStartId, parsedEndId] },
        },
      });

      if (!productsToUpdate || productsToUpdate.length === 0) {
        throw {
          status: 404,
          message: "No products found within the specified range.",
        };
      }

      const updatedProducts = await Promise.all(
        productsToUpdate.map(async (product) => {
          let newPrice;

          if (isPercentage) {
            newPrice =
              product.price + product.price * (parsedUpdateValue / 100);
          } else {
            newPrice = parsedUpdateValue;
          }

          await product.update({ price: newPrice });
          return product;
        })
      );

      return res.status(200).json({
        ok: true,
        message: "Prices updated successfully.",
        meta: {
          status: 200,
          total: updatedProducts.length,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  editProductPriceByCategory: async (req, res) => {
    try {
      const { categoryId, updateValue, isPercentage } = req.body;

      if (!categoryId || !updateValue) {
        throw {
          status: 400,
          message: "Category and updateValue are required fields.",
        };
      }

      const updatedProducts = await updateProductPricesByCategory(
        categoryId,
        updateValue,
        isPercentage
      );

      return res.status(200).json({
        ok: true,
        message: "Prices updated successfully by category.",
        meta: {
          status: 200,
          total: updatedProducts.length,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  uploadBannerImages: (req, res) => {
    try {
      const { files } = req;

      if (!files || files.length !== 3) {
        return res.status(400).json({
          ok: false,
          error: "Debes cargar exactamente tres imágenes.",
        });
      }

      const uploadedImages = [];
      let errorOccurred = false; // Variable para rastrear errores

      files.forEach((file, index) => {
        const imageFileName = `${Date.now()}-${index}${path.extname(
          file.originalname
        )}`;
        const imagePath = path.resolve(
          __dirname,
          "../../public/images/horizontalBanners",
          imageFileName
        );

        // Mueve la imagen cargada a la carpeta "public/horizontalBanners"
        try {
          fs.renameSync(file.path, imagePath);
          uploadedImages.push({
            fileName: imageFileName,
            /* path: `http://localhost:3000/images/horizontalBanners/${imageFileName}`, */
            path: `https://gabriellanzillotti.wnpower.host/images/horizontalBanners/${imageFileName}`,
          });
        } catch (error) {
          console.error("Error al renombrar el archivo:", error);
          errorOccurred = true; // Marcar que se produjo un error
        }
      });

      // Verificar si se produjo un error antes de enviar la respuesta
      if (errorOccurred) {
        return res.status(400).json({
          ok: false,
          error: "Hubo un problema al renombrar uno o más archivos.",
        });
      }

      return res.status(200).json({
        ok: true,
        data: uploadedImages,
        meta: {
          status: 200,
          total: uploadedImages.length,
        },
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        error: error.message || "Error al cargar las imágenes.",
      });
    }
  },
  deleteOldImages: async (req, res) => {
    try {
      const bannersFolder = path.resolve(
        __dirname,
        "../../public/images/horizontalBanners"
      );

      const existingImages = fs.readdirSync(bannersFolder);

      for (const file of existingImages) {
        const filePath = path.join(bannersFolder, file);

        try {
          await fs.promises.unlink(filePath);
        } catch (error) {
          console.error("Error al eliminar la imagen:", error);
        }
      }

      return res.status(200).json({
        ok: true,
        message: "Imágenes eliminadas con éxito.",
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        error: "Error al eliminar las imágenes: " + error.message,
      });
    }
  },
  getAllBanners: (req, res) => {
    try {
      const horizontalBannersDir = path.resolve(
        __dirname,
        "../../public/images/horizontalBanners"
      );

      const files = fs.readdirSync(horizontalBannersDir);

      // Construye rutas completas para las imágenes
      const imageUrls = files.map((file) => {
        return {
          fileName: file,
          path: `https://gabriellanzillotti.wnpower.host/images/horizontalBanners/${file}`,
        }
      });

      res.json(imageUrls);
    } catch (error) {
      console.error("Error al obtener las rutas de las imágenes:", error);
      res.status(500).json({ error: "Error al obtener las imágenes" });
    }
  },
  getStaticBanners: async (req, res) => {
    try {
      const staticBannersFolder = path.resolve(
        __dirname,
        "../../public/images/StaticBanners"
      );

      const existingImages = fs.readdirSync(staticBannersFolder);

      const staticBanners = existingImages.map((file) => {
        return {
          fileName: file,
          /* path: `http://localhost:3000/images/StaticBanners/${file}`, */
          path: `https://gabriellanzillotti.wnpower.host/images/StaticBanners/${file}`,
        };
      });

      return res.status(200).json({
        ok: true,
        data: staticBanners,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        error: "Error al obtener los banners estáticos: " + error.message,
      });
    }
  },
  uploadBannerImagesStatic: (req, res) => {
    try {
      const { files } = req;

      if (!files || files.length !== 3) {
        return res.status(400).json({
          ok: false,
          error: "Debes cargar exactamente tres imágenes.",
        });
      }

      const uploadedImages = [];
      let errorOccurred = false; // Variable para rastrear errores

      files.forEach((file, index) => {
        const imageFileName = `${Date.now()}-${index}${path.extname(
          file.originalname
        )}`;
        const imagePath = path.resolve(
          __dirname,
          "../../public/images/StaticBanners",
          imageFileName
        );

        // Mueve la imagen cargada a la carpeta "public/StaticBanners"
        try {
          fs.renameSync(file.path, imagePath);
          uploadedImages.push({
            fileName: imageFileName,
            /* path: `http://localhost:3000/images/StaticBanners/${imageFileName}`, */
            path: `https://gabriellanzillotti.wnpower.host/images/StaticBanners/${imageFileName}`,
          });
        } catch (error) {
          console.error("Error al renombrar el archivo:", error);
          errorOccurred = true; // Marcar que se produjo un error
        }
      });

      // Verificar si se produjo un error antes de enviar la respuesta
      if (errorOccurred) {
        return res.status(400).json({
          ok: false,
          error: "Hubo un problema al renombrar uno o más archivos.",
        });
      }

      return res.status(200).json({
        ok: true,
        data: uploadedImages,
        meta: {
          status: 200,
          total: uploadedImages.length,
        },
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        error: error.message || "Error al cargar las imágenes.",
      });
    }
  },
  deleteOldImagesStatic: async (req, res) => {
    try {
      const bannersFolder = path.resolve(
        __dirname,
        "../../public/images/StaticBanners"
      );

      const existingImages = fs.readdirSync(bannersFolder);

      for (const file of existingImages) {
        const filePath = path.join(bannersFolder, file);

        try {
          await fs.promises.unlink(filePath);
        } catch (error) {
          console.error("Error al eliminar la imagen:", error);
        }
      }

      return res.status(200).json({
        ok: true,
        message: "Imágenes eliminadas con éxito.",
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        error: "Error al eliminar las imágenes: " + error.message,
      });
    }
  },
};
