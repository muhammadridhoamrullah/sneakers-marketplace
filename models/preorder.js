"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Preorder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Preorder.hasMany(models.PreorderTransaction, {
        foreignKey: "PreOrderId",
      });
      Preorder.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Preorder.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
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
      releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Release date is required",
          },
          notEmpty: {
            msg: "Release date is required",
          },
        },
      },
      expectedDeliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Expected delivery date is required",
          },
          notEmpty: {
            msg: "Expected delivery date is required",
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
      retailPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Retail price is required",
          },
          notEmpty: {
            msg: "Retail price is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
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
      retailStore: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      guaranteed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      refundPolicy: {
        type: DataTypes.STRING,
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
      totalSlots: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Total slots is required",
          },
          notEmpty: {
            msg: "Total slots is required",
          },
        },
      },
      remainingSlots: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Remaining slots is required",
          },
          notEmpty: {
            msg: "Remaining slots is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Preorder",
    }
  );
  return Preorder;
};
