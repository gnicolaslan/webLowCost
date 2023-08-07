const createHttpError = require("http-errors");
const db = require("../database/models");
const createResponseError = require("../helpers/createResponseError");
const { verifyUserByEmail } = require("../services/userServices");
const generateTokenRandom = require("../helpers/generateTokenRandom");
const { compare, hash } = require("bcryptjs");
const generateJWT = require("../helpers/generateJWT");

const register = async (req, res) => {
  try {
    const { name, surname, password, phone, email } = req.body;
    if (
      [name, surname, password, phone, email].includes("") ||
      !name ||
      !surname ||
      !password ||
      !phone ||
      !email
    ) {
      throw createHttpError(400, "Se requiren todos los campos");
    }

    let user = await verifyUserByEmail(email);

    if (user) {
      throw createHttpError(400, "El email ya se encuentra registrado");
    }

    const hashedPassword = await hash(password, 10);

    user = await db.User.create({
      ...req.body,
      password: hashedPassword,
      rolId: 2,
    });

    user.token = generateTokenRandom();
    const newUser = await user.save();

    return res.status(201).json({
      ok: true,
      message: "Usuario registrado con exito!",
      data: {
        newUser,
      },
    });
  } catch (error) {
    createResponseError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].includes("") || !email || !password) {
      throw createHttpError(401, "Todos los campos son requeridos");
    }

    let user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw createHttpError(400, "El usuario no existe");
    }

    const isPasswordValid = await compare(password, user.dataValues.password);

    if (isPasswordValid) {
      return res.status(200).json({
        ok: true,
        token: generateJWT({
          user: {
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
          },
        }),
      });
    } else {
      throw createHttpError(403, "Credenciales Invalidas");
    }
  } catch (error) {
    createResponseError(res, error);
  }
};

const profile = async (req,res) => {
  return res.status(200).json({
    ok : true,
    user : req.user
  })
}

module.exports = {
  register,
  login,
  profile
};
