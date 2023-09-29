const db = require("../database/models");
const cloudinary = require("cloudinary").v2;

module.exports = {
  getAllUsers: async () => {
    try {
      const users = await db.User.findAll({
        attributes: ["id", "name", "surname", "email", "checked", "phone", "shopping"],
        include: [
          {
            model: db.Address,
            as: "address",
            attributes: ["street", "numberAddress", "postCode"],
          },
          {
            model: db.Rol,
            as: "rol",
            attributes: ["name"],
          },
        ],
      });

      return users;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message,
      };
    }
  },
  getAllProducts: async () => {
    try {
      const products = await db.Product.findAll({
        include: [
          {
            association: "category",
            attributes: ["id", "name"],
          },
          {
            association: "brand",
            attributes: ["id", "name"],
          },
        ],
      });

      return products;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message,
      };
    }
  },
  createNewProduct: async (body, imageFiles) => {
    try {
      const { title, price, priceUSD,description, brandId, categoryId, stock, offer, visible } = body;
      const imageUrls = [];

      // Subir cada imagen a Cloudinary y obtener las URLs generadas
      for (const imageFile of imageFiles) {
        const result = await cloudinary.uploader.upload(imageFile.path);
        imageUrls.push(result.secure_url);
      }

      const imageUrlString = JSON.stringify(imageUrls);

      // Crear el producto y almacenar el URL de la imagen
      const newProduct = await db.Product.create({
        name: title,
        price: +price,
        priceUSD: Number(priceUSD),
        description: description,
        brandId: +brandId,
        categoryId: +categoryId,
        stock: +stock,
        offer: offer,
        visible: visible,
        imageUrls: imageUrlString,
      });

      return newProduct;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message,
      };
    }
  },
  deleteProduct: async (id) => {
    try {
      const product = await db.Product.findByPk(id);
      await product.destroy();
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message,
      };
    }
  },
  productToEdit: async (id) => {
    try {
      const product = await db.Product.findByPk(id, {
        include: [
          {
            association: "category",
            attributes: ["name"],
          },
          {
            association: "brand",
            attributes: ["name"],
          },
        ],
      });

      return product;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message,
      };
    }
  },
  editProduct: async (body, id) => {
    try {
      const { title, price, priceUSD,description, brandId, categoryId, stock, offer, visible } = body;

      const editedProduct = await db.Product.update(
        {
          name: title,
          price: Number(price),
          priceUSD: Number(priceUSD),
          description,
          brandId: +brandId,
          categoryId: +categoryId,
          stock: +stock,
          offer: offer,
          visible: visible,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return editedProduct;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message,
      };
    }
  },
};
