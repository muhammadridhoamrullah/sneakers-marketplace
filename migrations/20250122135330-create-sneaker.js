"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sneakers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      brand: {
        type: Sequelize.STRING,
      },
      releaseYear: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.STRING,
      },
      condition: {
        type: Sequelize.STRING,
      },
      colorway: {
        type: Sequelize.STRING,
      },
      collaboration: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      box: {
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
      authenticityStatus: {
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
    await queryInterface.dropTable("Sneakers");
  },
};
