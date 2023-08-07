"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcryptjs = require('bcryptjs');
const generateTokenRandom = require('../../helpers/generateTokenRandom');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin",
          surname: "Test",
          password: bcryptjs.hashSync('123456', 10),
          token : generateTokenRandom(),
          checked : null,
          phone: 1139034290,
          email: "admin@test.com",
          rolId: 1,
          addressId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User",
          surname: "Test",
          password: bcryptjs.hashSync('123456', 10),
          token : generateTokenRandom(),
          checked : null,
          phone: 1139034290,
          email: "user@test.com",
          rolId: 2,
          addressId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
