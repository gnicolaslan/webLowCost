const createResponseError = require("../helpers/createResponseError");
const {
  getOneProduct,
  getProductByKeyword,
  getProductsByCategory,
  getProductsByBrand,
  getProductsByOffer,
  getAllBrands,
  getAllCategories,
  getLastProductInDB,
} = require("../services/productServices");

module.exports = {
  productDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await getOneProduct(id);

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
  getLastProduct: async (req, res) => {
    try {
        const lastProduct = await getLastProductInDB();
  
        if (!lastProduct) {
          return res.status(404).json({
            ok: false,
            message: 'No se encontró ningún producto en la base de datos.',
          });
        }
  
        return res.status(200).json({
          ok: true,
          data: lastProduct,
          meta: {
            status: 200,
          },
        });
      } catch (error) {
        return createResponseError(res, error);
      }
  },

  searchProduct: async (req, res) => {
    try {
      const keyword = req.query.keyword;

      if (!keyword) {
        return res.status(400).json({
          ok: false,
          message: "Por favor, proporcione un keyword válido en la consulta.",
        });
      }
      const result = await getProductByKeyword(keyword);

      if (result.length === 0) {
        return res.status(404).json({
          ok: false,
          message:
            "No se encontraron productos que coincidan con la palabra clave proporcionada.",
          keyword: keyword,
        });
      }

      return res.status(200).json({
        ok: true,
        data: result,
        meta: {
          status: 200,
          total: result.length,
          keyword: keyword,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },

  searchByCategory: async (req, res) => {
    try {
      const categories = req.params.id;
      const products = await getProductsByCategory(categories);

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

  searchByBrand: async (req, res) => {
    try {
      const brands = req.params.id;
      const products = await getProductsByBrand(brands);

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
  searchByOffer: async (req, res) => {
    try {
      const products = await getProductsByOffer();

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
  allBrands: async (req, res) => {
    try {
      const brands = await getAllBrands();
      /* console.log(brands); */

      return res.status(200).json({
        ok: true,
        data: brands,
        meta: {
          status: 200,
          total: brands.length,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
  allCategories: async (req, res) => {
    try {
      const categories = await getAllCategories();
      /*     console.log("categorias:", categories); */

      return res.status(200).json({
        ok: true,
        data: categories,
        meta: {
          status: 200,
          total: categories.length,
        },
      });
    } catch (error) {
      return createResponseError(res, error);
    }
  },
};
