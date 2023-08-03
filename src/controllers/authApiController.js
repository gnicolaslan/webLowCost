const createHttpError = require("http-errors");
const db = require("../database/models");
const createResponseError = require("../helpers/createResponseError");

const register = async (req, res) => {
  try {
    const { name, surname, password, phone, email } = req.body;
    if ([!name, !surname, !password, !phone, !email]) {
      throw createHttpError(400, "Se requiren todos los campos");
    }

    let user = await db.User.findOne({
        email
    })

    if(user){
        throw createHttpError(400,'El email ya se encuentra registrado')
    }

    user = new db.User.create(req.body)
  } catch (error) {
    createResponseError(res, error);
  }
};

module.exports = {
  register,
};
