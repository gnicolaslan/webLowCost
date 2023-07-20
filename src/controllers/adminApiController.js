const createResponseError = require('../helpers/createResponseError');
const { getAllUsers, getAllProducts, createNewProduct, deleteProduct, productToEdit, editProduct } = require('../services/adminServices');

module.exports = {
    showListUsers : async (req,res) =>{
        try {
            const users = await getAllUsers();

            return res.status(200).json({
                ok : true,
                data : users,
                meta : {
                    status : 200,
                    total : users.length,
                }
            })
        } catch (error) {
            return createResponseError(res,error)
        }
    },
    showListProducts : async (req,res) =>{
        try {
            const products = await getAllProducts();

            return res.status(200).json({
                ok : true,
                data : products,
                meta : {
                    status : 200,
                    total : products.length,
                }
            })
        } catch (error) {
            return createResponseError(res,error)
        }
    },
    createProduct : async (req,res) =>{
        try {
            const newProduct = await createNewProduct(req.body);


             return res.status(200).json({
                ok : true,
                data : newProduct,
                meta : {
                    status : 200,
                    total : newProduct.length,
                    url : `/api/product/detail/${newProduct.id}`
                }
            }) 
        } catch (error) {
            return createResponseError(res,error)            
        }
    },
    deleteProduct : async (req,res) =>{
        try {
            const {id} = req.params
            const deletedProduct = await deleteProduct(id);

            return res.status(200).json({
                ok : true,
                message : 'Product deleted with sucess',
                meta : {
                    status : 200,
                    total : 1
                },
                data : {
                    deletedProduct
                }
            })
      
        } catch (error) {
            return createResponseError(res,error)                        
        }
    },
    getEditProduct : async (req,res) =>{
        try {
            const product = await productToEdit(req.params.id)

            return res.status(200).json({
                ok : true,
                data : product,
                meta : {
                  status : 200,
                  total : 1
                }
              })
        } catch (error) {
            return createResponseError(res,error)                                    
        }
    },
    saveEditProduct : async (req,res) =>{
        try {
            const {id} = req.params
            const saveProduct = await editProduct(req.body,id)

            return res.status(200).json({
                ok : true,
                meta : {
                  status : 200,
                  total : 1,
                  url : `/api/product/detail/${id}`
                },
                data : {
                  editedProduct : saveProduct,
                }
              })
        } catch (error) {
            return createResponseError(res,error)                        
        }
    },
}