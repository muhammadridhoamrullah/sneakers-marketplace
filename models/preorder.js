'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preorder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Preorder.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    expectedDeliveryDate: DataTypes.DATE,
    price: DataTypes.INTEGER,
    retailPrice: DataTypes.INTEGER,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    retailStore: DataTypes.STRING,
    guaranteed: DataTypes.BOOLEAN,
    refundPolicy: DataTypes.STRING,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    totalSlots: DataTypes.INTEGER,
    remainingSlots: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Preorder',
  });
  return Preorder;
};