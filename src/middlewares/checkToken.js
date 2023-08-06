const createHttpError = require("http-errors")
const { verify } = require("jsonwebtoken");
const db = require("../database/models");

module.exports = async (req,res,next) => {
    try {
        if(!req.headers.authorization){
            throw createHttpError(401,'Se requiere un token')
        }



        const token = req.headers.authorization;
        const decoded = verify(token,process.env.JWT_SECRET);
        req.user = await db.User.findByPk(decoded.user.id,{
            attributes : {
                exclude : ['surname','password','token','checked','createdAt','updatedAt']
            }
        });

        next()
    } catch (error) {
        let message;

        switch (error.message) {
            case "jwt malformed":
                message = "Token corrupto"
                break;
            case "jwt expired":
                message = "El Token ha expirado"
                break
            case "invalid token":
                message = "Token inválido"
                break   
            case "invalid signature":
                message = "Firma inválida"
            break     
            default:
                message = error.message
                break;
        }
        
        return res.status(error.status || 500).json({
            ok:false,
            message: message || "Ha ocurrido un error"
        })
    }
}