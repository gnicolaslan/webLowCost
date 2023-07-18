'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Brands',
      [
        {
          name: "Electrolux",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Whirlpool",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Mabe",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Samsung",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "LG",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Philco",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Consul",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Brastemp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "General Electric",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});

  }
};
