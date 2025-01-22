"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Preorders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      releaseDate: {
        type: Sequelize.DATE,
      },
      expectedDeliveryDate: {
        type: Sequelize.DATE,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      retailPrice: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      retailStore: {
        type: Sequelize.STRING,
      },
      guaranteed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      refundPolicy: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
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
      totalSlots: {
        type: Sequelize.INTEGER,
      },
      remainingSlots: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Preorders");
  },
};
