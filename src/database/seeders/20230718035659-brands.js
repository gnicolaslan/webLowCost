'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Brands',
      [
        {
          name: "Electrolux",
          image: 'electrolux.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Whirlpool",
          image: 'whirlpool.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Mabe",
          image: 'mabe.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Samsung",
          image: 'samsung.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "LG",
          image: 'lg.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Philco",
          image: 'philco.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Consul",
          image: 'consul.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Brastemp",
          image: 'brastemp.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "General Electric",
          image: 'general.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "otro",
          image: 'general.png',
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
