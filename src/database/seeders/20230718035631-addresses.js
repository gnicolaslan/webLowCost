"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Addresses",
      [
        {
          street: "Calle Falsa",
          numberAddress: 1234,
          postCode: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: "Avenida Imaginaria",
          numberAddress: 1234,
          postCode: 5678,
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
