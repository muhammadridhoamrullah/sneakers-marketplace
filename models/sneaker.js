"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sneaker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sneaker.hasMany(models.Auction, { foreignKey: "SneakerId" });
      Sneaker.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Sneaker.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Sneaker name is required",
          },
          notEmpty: {
            msg: "Sneaker name is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required",
          },
          notEmpty: {
            msg: "Price is required",
          },
        },
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Brand is required",
          },
          notEmpty: {
            msg: "Brand is required",
          },
        },
      },
      releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Release year is required",
          },
          notEmpty: {
            msg: "Release year is required",
          },
        },
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Size is required",
          },
          notEmpty: {
            msg: "Size is required",
          },
        },
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Condition is required",
          },
          notEmpty: {
            msg: "Condition is required",
          },
        },
      },
      colorway: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Colorway is required",
          },
          notEmpty: {
            msg: "Colorway is required",
          },
        },
      },
      collaboration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image URL is required",
          },
          notEmpty: {
            msg: "Image URL is required",
          },
        },
      },
      box: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Box is required",
          },
          notEmpty: {
            msg: "Box is required",
          },
        },
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
      authenticityStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Sneaker",
    }
  );
  return Sneaker;
};
