"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Auctions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      SneakerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Sneakers",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      startingPrice: {
        type: Sequelize.INTEGER,
      },
      currentPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      reservePrice: {
        type: Sequelize.INTEGER,
      },
      minBidIncrement: {
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: Sequelize.DATE,
      },
      endTime: {
        type: Sequelize.DATE,
      },
      allowAutoBid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      buyNowPrice: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      WinnerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
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
      totalBids: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable("Auctions");
  },
};
