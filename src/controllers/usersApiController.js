const db = require('../database/models');
const CreateResponseError = require('../helpers/CreateResponseError');
const { getUserById } = require('../services/userServices');

module.exports = {
    user : async (req,res) =>{
        return res.send('welcome user')
    },
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
            CreateResponseError(res,error)
        }
    },
    verifyEmail : async (req,res) =>{

    },
}