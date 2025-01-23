"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Auction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Auction.hasMany(models.Bid, { foreignKey: "AuctionId" });
      Auction.hasMany(models.UserRating, { foreignKey: "AuctionId" });
      Auction.belongsTo(models.Sneaker, { foreignKey: "SneakerId" });
      Auction.belongsTo(models.User, { as: "Seller", foreignKey: "UserId" });
      Auction.belongsTo(models.User, { as: "Winner", foreignKey: "WinnerId" });
    }
  }
  Auction.init(
    {
      SneakerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Sneaker ID is required",
          },
          notEmpty: {
            msg: "Sneaker ID is required",
          },
        },
      },
      startingPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Starting price is required",
          },
          notEmpty: {
            msg: "Starting price is required",
          },
        },
      },
      currentPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reservePrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      minBidIncrement: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Minimum bid increment is required",
          },
          notEmpty: {
            msg: "Minimum bid increment is required",
          },
        },
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Start time is required",
          },
          notEmpty: {
            msg: "Start time is required",
          },
        },
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "End time is required",
          },
          notEmpty: {
            msg: "End time is required",
          },
        },
      },
      allowAutoBid: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      buyNowPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status is required",
          },
          notEmpty: {
            msg: "Status is required",
          },
        },
      },
      WinnerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User ID is required",
          },
          notEmpty: {
            msg: "User ID is required",
          },
        },
      },
      totalBids: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Auction",
    }
  );
  return Auction;
};
