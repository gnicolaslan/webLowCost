'use strict';

/** @type {import('sequelize-cli').Migration} */
const productImages = [
  {
    name: "refrigerador.jpg",
    productId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "lavador.jpg",
    productId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "televisor.jpg",
    productId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "aire.jpg",
    productId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "licuadora.jpg",
    productId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "microondas.jpg",
    productId: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "aspiradora.jpg",
    productId: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "cafetera.jpg",
    productId: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "tostadora.jpg",
    productId: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "horno.jpg",
    productId: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "estufa.jpg",
    productId: 11,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "batidora.jpg",
    productId: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "plancha.jpg",
    productId: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', productImages, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
