'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Auction.init({
    SneakerId: DataTypes.INTEGER,
    startingPrice: DataTypes.INTEGER,
    currentPrice: DataTypes.INTEGER,
    reservePrice: DataTypes.INTEGER,
    minBidIncrement: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    allowAutoBid: DataTypes.BOOLEAN,
    buyNowPrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    WinnerId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    totalBids: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Auction',
  });
  return Auction;
};