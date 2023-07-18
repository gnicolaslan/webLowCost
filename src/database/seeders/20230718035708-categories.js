'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
      [
        {
          name: "Refrigeradores",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Lavadoras",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Televisores",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Aires Acondicionados",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Licuadoras",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Microondas",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Aspiradoras",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Cafeteras",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Tostadoras",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Hornos",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Estufas",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Batidoras",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Planchas",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Secadoras",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Cocinas",
          createdAt: new Date(),
          updatedAt: new Date()
        }
        ,
      ],
      {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
