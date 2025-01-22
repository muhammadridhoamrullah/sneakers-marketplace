'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRating.init({
    RatedUserId: DataTypes.INTEGER,
    ReviewerId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    typeTransaction: DataTypes.STRING,
    AuctionId: DataTypes.INTEGER,
    PreorderTransactionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRating',
  });
  return UserRating;
};