'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
      [
        {
          name: "Refrigeradores",
          image: 'Refrigeradores.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Lavadoras",
          image: 'Lavadoras.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Televisores",
          image: 'Televisores.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Aires Acondicionados",
          image: 'Aires Acondicionados.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Licuadoras",
          image: 'Licuadoras.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Microondas",
          image: 'Microondas.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Aspiradoras",
          image: 'Aspiradoras.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Cafeteras",
          image: 'Cafeteras.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Tostadoras",
          image: 'Tostadoras.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Hornos",
          image: 'Hornos.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Estufas",
          image: 'Estufas.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Batidoras",
          image: 'Batidoras.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Planchas",
          image: 'Planchas.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Secadoras",
          image: 'Secadoras.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Cocinas",
          image: 'Cocinas.png',
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
