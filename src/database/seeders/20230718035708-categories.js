'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
      [
        { name: "Art. de Baño", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Art. de Cocina", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Aires Acondicionados", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Aspiradoras", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Batidoras", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Bazar", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Bicicletas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Cafeteras", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Calefactores", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Caloventores", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Cocinas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Consolas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Celulares", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Estufas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Freezers", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Herramientas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Heladeras", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Hornos", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Juguetes", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Lavarropas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Lavavajillas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Licuadoras", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Mochilas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Microondas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Muebles", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Parlantes", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Pavas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Peluquería", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Piletas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Planchas", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "SmartWatchs", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Soportes de tv", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Tablets", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Tecno", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Televisores", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Termos", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Termotanques", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Tostadoras", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Ventiladores", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Otros", image: 'general.png', createdAt: new Date(), updatedAt: new Date() },
      ],
      {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
