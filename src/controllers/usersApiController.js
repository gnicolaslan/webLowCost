const db = require("../database/models");
const CreateResponseError = require("../helpers/createResponseError");
const {
  getUserById,
  verifyUserByEmail,
  updateInfoUser,
} = require("../services/userServices");

module.exports = {
  detail: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await getUserById(id);
      const address = await user.getAddress();

      if (!user) {
        return res.status(400).json({
          ok: false,
          error: {
            status: 404,
            message: `The User with that ${id} was not found`,
          },
        });
      }

      return res.status(200).json({
        ok: true,
        user: {
          ...user.dataValues,
          address: address.dataValues,
        },
        meta: {
          status: 200,
          total: 1,
          url: `/api/user/${id}`,
        },
      });
    } catch (error) {
      console.log(error);
      CreateResponseError(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id; 
      console.log(id);
      const { name, surname, phone } = req.body;
  
      const userUpdated = await updateInfoUser(id, { name, surname, phone });
  
      return res.status(200).json({
        ok: true,
        data: {
          message: "User modified success",
          user: {
            id: userUpdated.id,
            name: userUpdated.name,
            surname: userUpdated.surname,
            phone: userUpdated.phone,
          },
        },
        meta: {
          status: 200,
          total: 1,
          url: `/api/users/profile/${userUpdated.id}`,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        error: "Internal server error",
      });
    }
  },
  verifyByEmail: async (req, res) => {
    try {
      const userExist = await verifyUserByEmail(req.body.email, req.body);

      if (!userExist) {
        return res.status(400).json({
          ok: false,
          error: {
            status: 404,
            message: `The User with that ${email} was not found!`,
          },
        });
      }

      return res.status(200).json({
        ok: true,
        data: {
          userExist,
        },
      });
    } catch (error) {
      console.log(error);
      return CreateResponseError(res, error);
    }
  },
};
