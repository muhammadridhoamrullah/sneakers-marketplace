'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sneaker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sneaker.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    size: DataTypes.STRING,
    condition: DataTypes.STRING,
    colorway: DataTypes.STRING,
    collaboration: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    box: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    authenticityStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sneaker',
  });
  return Sneaker;
};