const createHttpError = require("http-errors");
const db = require("../database/models");
const createResponseError = require("../helpers/createResponseError");
const { verifyUserByEmail } = require("../services/userServices");
const generateTokenRandom = require("../helpers/generateTokenRandom");
const { compare, hash } = require("bcryptjs");
const generateJWT = require("../helpers/generateJWT");

const register = async (req, res) => {
  try {
    const { name, surname, email, phone, password } = req.body;
    if (
      [name, surname, email, phone, password].includes("") ||
      !name ||
      !surname ||
      !email ||
      !phone ||
      !password
    ) {
      throw createHttpError(400, "Se requiren todos los campos");
    }

    let user = await verifyUserByEmail(email);

    if (user) {
      throw createHttpError(400, "El email ya se encuentra registrado");
    }

    const hashedPassword = await hash(password, 10);

    const address = await db.Address.create({
      street: null,
      numberAddress: null,
      postCode: null,
    });

    user = await db.User.create({
      ...req.body,
      password: hashedPassword,
      rolId: 2,
      addressId: address.id,
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
            rolId: user.dataValues.rolId
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

const profile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await db.User.findByPk(userId);
    const address = await user.getAddress();

    return res.status(200).json({
      ok: true,
      user: {
        ...user.dataValues,
        address: address.dataValues
      }
    });
  } catch (error) {
    createResponseError(res, error);
  }
};

module.exports = {
  register,
  login,
  profile
};
