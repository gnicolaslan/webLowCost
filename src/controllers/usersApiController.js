const db = require('../database/models');
const CreateResponseError = require('../helpers/createResponseError');
const { getUserById, verifyUserByEmail, updateInfoUser } = require('../services/userServices');

module.exports = {
    detail : async (req,res) =>{
        try {
            const id = req.params.id;
            
            const user = await getUserById(id);

            if(!user){
                return res.status(400).json({
                    ok : false,
                    error : {
                        status : 404,
                        message : `The User with that ${id} was not found`
                    }
                })
            }

            return res.status(200).json({
                ok : true,
                data : user,
                meta : {
                    status : 200,
                    total : 1,
                    url: `/api/user/${id}`
                }
            })
        } catch (error) {
            console.log(error);
            CreateResponseError(res,error)
        }
    },
    update : async (req,res) => {
        try {
            const { id,name,surname,phone } = await updateInfoUser(req.params.id,req.body);
            return res.status(200).json({
                ok : true,
                data : {
                    message : 'User modified sucess',
                    user : {
                        id : id,
                        name : name,
                        surname : surname,
                        phone : phone
                    }
                },
                meta : {
                    staus : 200,
                    total : 1,
                    url: `/api/users/${req.params.id}`
                }
            })
        } catch (error) {
            
        }
    },
    verifyByEmail : async (req,res) =>{
        try {
            const userExist = await verifyUserByEmail(req.body.email,req.body);

            if(!userExist){
                return res.status(400).json({
                    ok : false,
                    error : {
                        status : 404,
                        message : `The User with that ${email} was not found!`
                    }
                })
            }

             return res.status(200).json({
                ok : true,
                data : {
                    userExist
                }
            })
        } catch (error) {
            console.log(error);
            return CreateResponseError(res,error);
        }
    },
}