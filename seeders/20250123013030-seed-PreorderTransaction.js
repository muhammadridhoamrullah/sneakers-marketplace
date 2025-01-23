"use strict";
let data = require("../db/preorderTransaction.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data = data.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("PreorderTransactions", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PreorderTransactions", null, {});
  },
};
