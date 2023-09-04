"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Addresses",
      [
        {
          street: "Calle Falsa 123",
          numberAddress: 1234,
          postalCode: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: "Avenida Imaginaria 456",
          numberAddress: 1234,
          postalCode: 5678,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: "Calle Inexistente 789",
          numberAddress: 1234,
          postalCode: 9012,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: "Pasaje Irreal 10",
          numberAddress: 1234,
          postalCode: 3456,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: "Camino Ficticio 987",
          postalCode: 7890,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  },
};
