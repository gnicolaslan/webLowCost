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
        dni: dataUser.dni,
      });

      // Verifica si se proporcionó una dirección en los datos del usuario
      if (dataUser.address) {
        // Obtén la dirección actual del usuario o crea una nueva si no existe
        let address = userUpdated.address;
        if (!address) {
          address = await db.Address.create({});
          await userUpdated.setAddress(address);
        }

        // Actualiza los campos de la dirección
        address.street = dataUser.address.street;
        address.numberAddress = dataUser.address.numberAddress;
        address.postCode = dataUser.address.postCode;

        // Guarda la dirección actualizada
        await address.save();
      }

      await userUpdated.reload();

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
