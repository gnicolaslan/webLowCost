'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
      [
        { name: "Art. de Baño", image: 'artbaño.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Art. de Cocina", image: 'artcocina.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Aires Acondicionados", image: 'aire.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Aspiradoras", image: 'aspiradora.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Batidoras", image: 'batidora.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Bazar", image: 'bazar.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Bicicletas", image: 'bicicleta.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Cafeteras", image: 'cafetera.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Calefactores", image: 'calefactor.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Caloventores", image: 'caloventor.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Cocinas", image: 'cocina.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Consolas", image: 'consola.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Celulares", image: 'celular.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Estufas", image: 'estufa.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Freezers", image: 'freezer.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Herramientas", image: 'herramienta.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Heladeras", image: 'heladera.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Hornos", image: 'horno.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Juguetes", image: 'juguete.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Lavarropas", image: 'lavarropas.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Lavavajillas", image: 'lavavajillas.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Licuadoras", image: 'licuadora.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Mochilas", image: 'mochila.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Microondas", image: 'microondas.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Muebles", image: 'mueble.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Parlantes", image: 'parlante.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Pavas", image: 'pava.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Peluquería", image: 'peluqueria.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Piletas", image: 'pileta.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Planchas", image: 'plancha.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "SmartWatchs", image: 'smartwatch.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Soportes de tv", image: 'soportetv.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Tablets", image: 'tablet.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Tecno", image: 'tecno.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Televisores", image: 'televisor.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Termos", image: 'termo.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Termotanques", image: 'termotanque.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Tostadoras", image: 'tostadora.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Ventiladores", image: 'ventilador.png', createdAt: new Date(), updatedAt: new Date() },
        { name: "Otros", image: 'otros.svg', createdAt: new Date(), updatedAt: new Date() },
      ],
      {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
