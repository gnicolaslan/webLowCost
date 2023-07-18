'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Addresses',
      [
        {
          street: "Calle Falsa 123",
          location: "Buenos Aires",
          province: "Buenos Aires",
          postalCode: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: "Avenida Imaginaria 456",
          location: "Córdoba",
          province: "Córdoba",
          postalCode: 5678,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: "Calle Inexistente 789",
          location: "Rosario",
          province: "Santa Fe",
          postalCode: 9012,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: "Pasaje Irreal 10",
          location: "Mendoza",
          province: "Mendoza",
          postalCode: 3456,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          street: "Camino Ficticio 987",
          location: "Mar del Plata",
          province: "Buenos Aires",
          postalCode: 7890,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  }
};
