"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Sneaker, { foreignKey: "UserId" });
      User.hasMany(models.Auction, {
        as: "CreatedAuctions",
        foreignKey: "UserId",
      });
      User.hasMany(models.Auction, {
        as: "WonAuctions",
        foreignKey: "WinnerId",
      });
      User.hasMany(models.Bid, { foreignKey: "UserId" });
      User.hasMany(models.Preorder, { foreignKey: "UserId" });
      User.hasMany(models.PreorderTransaction, { foreignKey: "UserId" });
      User.hasMany(models.UserRating, {
        as: "Direview",
        foreignKey: "RatedUserId",
      });
      User.hasMany(models.UserRating, {
        as: "Reviewer",
        foreignKey: "ReviewerId",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email must be unique",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email format is invalid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6, 200],
            msg: "Password must be at least 6 characters",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isVerifiedReseller: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      resellerVerificationStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
