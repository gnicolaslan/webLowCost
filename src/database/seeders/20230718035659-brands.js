'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Brands',
      [
        { name: "Aurora", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Avenli", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "amiciCucina", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Black&Decker", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Briket", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Blu", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Cocinex", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Codini", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Colombia", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Conometal", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "CORVO", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Daewoo", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "DeWalt", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Diluvio", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Discovery", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Drean", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Electra", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Electrolux", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Enova", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Escorial", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Extreme", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "FAGOR", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Feders", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "GAMA", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Gravity", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "HEAD", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Hitachi", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "HP", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Hyundai", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Iphone", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Ken Brown", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Kitchenaid", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Kodak", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Kovea", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Lamborghini", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "LG", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Liliana", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Lumer", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Magiclick", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Mega Express", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Millenium", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Mor", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Motorola", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Mountain Bike", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Noblex", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Otros", image: 'general.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Panoramic", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "PEABODY", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "PHILCO", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "PlayStation", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "POCO", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Quantum", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Ranser", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "RCA", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Samsung", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Sherman", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Star Trak", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "STANLEY", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Teora", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Ultracomb", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Universal", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Vitta", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Westinghouse", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Whirlpool", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "YELMO", image: '', createdAt: new Date(), updatedAt: new Date() },
        { name: "Otros", image: 'general.png', createdAt: new Date(), updatedAt: new Date() },
      ],
      {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});

  }
};
