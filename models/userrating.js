"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRating.belongsTo(models.User, { foreignKey: "RatedUserId" });
      UserRating.belongsTo(models.User, { foreignKey: "ReviewerId" });
      UserRating.belongsTo(models.Auction, { foreignKey: "AuctionId" });
      UserRating.belongsTo(models.PreorderTransaction, {
        foreignKey: "PreorderTransactionId",
      });
    }
  }
  UserRating.init(
    {
      RatedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Rated User ID is required",
          },
          notEmpty: {
            msg: "Rated User ID is required",
          },
        },
      },
      ReviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Reviewer ID is required",
          },
          notEmpty: {
            msg: "Reviewer ID is required",
          },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Rating is required",
          },
          notEmpty: {
            msg: "Rating is required",
          },
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typeTransaction: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Type Transaction is required",
          },
          notEmpty: {
            msg: "Type Transaction is required",
          },
        },
      },
      AuctionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      PreorderTransactionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UserRating",
    }
  );
  return UserRating;
};
