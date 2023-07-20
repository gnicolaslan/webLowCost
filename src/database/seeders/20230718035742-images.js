'use strict';

/** @type {import('sequelize-cli').Migration} */
const productImages = [
  {
    name: "electro.jpg",
    productId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
    productId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
    productId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
    productId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
    productId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
    productId: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
    productId: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
    productId: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
    productId: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
    productId: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
    productId: 11,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
    productId: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "electro.jpg",
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
