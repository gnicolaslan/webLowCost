const db = require("../database/models");

module.exports = {
  getUserById: async (id) => {
    try {
      const user = await db.User.findByPk(id);

      return user;
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message,
      };
    }
  },
  updateInfoUser: async (id, dataUser) => {
    try {
      const userUpdated = await db.User.findByPk(id);

      if (!userUpdated) {
        throw new Error("User not found");
      }

      await userUpdated.update({
        name: dataUser.name,
        surname: dataUser.surname,
        phone: dataUser.phone,
      });

      return userUpdated;

    } catch (error) {
      console.log(error);
      throw {
        status: 500,
        message: error.message,
      };
    }
  },
  verifyUserByEmail: async (email) => {
    try {
      let user = await db.User.findOne({
        where: {
          email,
        },
      });
      return user ? true : false;
    } catch (error) {
      console.log(error);
      throw {
        status: 500,
        message: error.message,
      };
    }
  },
};
