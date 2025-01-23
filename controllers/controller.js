const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {
  User,
  Sneaker,
  Auction,
  Bid,
  Preorder,
  PreorderTransaction,
  UserRating,
} = require("../models/index");

class Controller {
  static async registerUser(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "EMAIL_PASSWORD_REQUIRED" };
      }

      const registeringUser = await User.create({
        email,
        password,
      });

      res.status(201).json({
        message: "User has been registered",
        data: {
          email: registeringUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "EMAIL_PASSWORD_REQUIRED" };
      }

      const findUserByEmail = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUserByEmail) {
        throw { name: "INVALID_EMAIL_PASSWORD" };
      }

      const checkPassword = comparePassword(password, findUserByEmail.password);

      if (!checkPassword) {
        throw { name: "INVALID_EMAIL_PASSWORD" };
      }

      const access_token = signToken({
        id: findUserByEmail.id,
      });

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllSneakers(req, res, next) {
    try {
      const allSneakers = await Sneaker.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });

      res.status(200).json({
        data: allSneakers,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addSneaker(req, res, next) {
    try {
      const {
        name,
        price,
        brand,
        releaseYear,
        size,
        condition,
        colorway,
        collaboration,
        imageUrl,
        box,
        authenticityStatus,
      } = req.body;

      if (
        !name ||
        !price ||
        !brand ||
        !releaseYear ||
        !size ||
        !condition ||
        !colorway ||
        !imageUrl ||
        !box
      ) {
        throw { name: "INVALID_INPUT_SNEAKER" };
      }

      const addingSneaker = await Sneaker.create({
        name,
        price,
        brand,
        releaseYear,
        size,
        condition,
        colorway,
        collaboration,
        imageUrl,
        box,
        authenticityStatus,
        UserId: req.user.id,
      });

      res.status(201).json({
        message: "Sneaker has been added",
        data: addingSneaker,
      });
    } catch (error) {
      console.log(error, "error di addSneaker");

      next(error);
    }
  }
}

module.exports = {
  Controller,
};
