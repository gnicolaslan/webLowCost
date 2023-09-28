'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products',
      [
        {
          name: "Refrigerador A",
          price: 50000,
          priceUSD: 200,
          description: "Refrigerador de alta capacidad",
          brandId: 1,
          categoryId: 1,
          stock: 10,
          offer: true,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Lavadora B",
          price: 35000,
          priceUSD: null,
          description: "Lavadora de carga frontal",
          brandId: 2,
          categoryId: 2,
          stock: 8,
          offer: true,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Televisor C",
          price: 20000,
          priceUSD: null,
          description: "Televisor de 50 pulgadas",
          brandId: 3,
          categoryId: 3,
          stock: 15,
          offer: true,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Aire Acondicionado D",
          price: 40000,
          priceUSD: 400,
          description: "Aire acondicionado portátil",
          brandId: 4,
          categoryId: 4,
          stock: 5,
          offer: true,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Licuadora E",
          price: 5000,
          priceUSD: 230,
          description: "Licuadora de alta potencia",
          brandId: 5,
          categoryId: 5,
          stock: 20,
          offer: true,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Microondas F",
          price: 3000,
          priceUSD: null,
          description: "Microondas con función de grill",
          brandId: 1,
          categoryId: 6,
          stock: 12,
          offer: true,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Aspiradora G",
          price: 6000,
          priceUSD: null,
          description: "Aspiradora sin bolsa",
          brandId: 2,
          categoryId: 7,
          stock: 6,
          offer: false,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Cafetera H",
          price: 8000,
          priceUSD: null,
          description: "Cafetera de cápsulas",
          brandId: 3,
          categoryId: 8,
          stock: 18,
          offer: false,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Tostadora I",
          price: 2500,
          priceUSD: 249,
          description: "Tostadora de acero inoxidable",
          brandId: 4,
          categoryId: 9,
          stock: 10,
          offer: false,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Horno J",
          price: 15000,
          priceUSD: null,
          description: "Horno eléctrico de convección",
          brandId: 5,
          categoryId: 10,
          stock: 7,
          offer: false,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Estufa K",
          price: 12000,
          priceUSD: null,
          description: "Estufa de gas con cuatro quemadores",
          brandId: 1,
          categoryId: 11,
          stock: 9,
          offer: false,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Batidora L",
          price: 4000,
          priceUSD: 2040,
          description: "Batidora con accesorios intercambiables",
          brandId: 2,
          categoryId: 12,
          stock: 14,
          offer: false,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Plancha M",
          price: 2000,
          priceUSD: null,
          description: "Plancha a vapor con control de temperatura",
          brandId: 3,
          categoryId: 13,
          stock: 11,
          offer: false,
          visible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});

  }
};
