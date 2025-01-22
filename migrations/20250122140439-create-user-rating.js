"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserRatings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      RatedUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      ReviewerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING,
      },
      typeTransaction: {
        type: Sequelize.STRING,
      },
      AuctionId: {
        type: Sequelize.INTEGER,
      },
      PreorderTransactionId: {
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
    await queryInterface.dropTable("UserRatings");
  },
};
