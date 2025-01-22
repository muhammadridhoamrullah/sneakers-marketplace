'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreorderTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PreorderTransaction.init({
    PreOrderId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    size: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    trackingNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PreorderTransaction',
  });
  return PreorderTransaction;
};