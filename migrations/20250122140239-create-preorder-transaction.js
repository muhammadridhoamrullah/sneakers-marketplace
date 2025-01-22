"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PreorderTransactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PreOrderId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Preorders",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      size: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      trackingNumber: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PreorderTransactions");
  },
};
