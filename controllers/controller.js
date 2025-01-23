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
  sequelize,
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

  static async getSneakerById(req, res, next) {
    try {
      const { id } = req.params;

      const findSneakerById = await Sneaker.findByPk(id, {
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });

      if (!findSneakerById) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).json({
        data: findSneakerById,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllBrands(req, res, next) {
    try {
      const allBrands = await Sneaker.findAll({
        attributes: ["brand"],
        group: ["brand"],
      });

      res.status(200).json({
        data: allBrands,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPopularSneakers(req, res, next) {
    try {
      const popularSneakers = await Bid.findAll({
        include: {
          model: Auction,
          include: {
            model: Sneaker,
          },
        },
      });

      const reducing = popularSneakers.reduce((acc, el) => {
        if (!acc[el.Auction.SneakerId]) {
          acc[el.Auction.SneakerId] = {
            sneakerName: el.Auction.Sneaker.name,
            totalBids: 1,
          };
        } else {
          acc[el.Auction.SneakerId].totalBids += 1;
        }

        return acc;
      }, {});

      console.log(reducing, "reducing");

      const sortResult = Object.keys(reducing)
        .sort((a, b) => {
          return reducing[b].totalBids - reducing[a].totalBids;
        })
        .map((key) => ({
          name: reducing[key].sneakerName,
          totalBids: reducing[key].totalBids,
        }));

      res.status(200).json(sortResult);
    } catch (error) {
      next(error);
    }
  }

  static async getSneakerByBrand(req, res, next) {
    try {
      const { brand } = req.params;

      const findSneakerByBrand = await Sneaker.findAll({
        where: {
          brand,
        },
      });

      if (findSneakerByBrand.length === 0) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).json({
        data: findSneakerByBrand,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateSneaker(req, res, next) {
    try {
      const { id } = req.params;

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

      const findSneakerById = await Sneaker.findByPk(id);
      if (!findSneakerById) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const updatingSneaker = await Sneaker.update(
        {
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
          authenticityStatus:
            req.user.role === "Admin"
              ? authenticityStatus
              : findSneakerById.authenticityStatus,
        },
        {
          where: {
            id,
          },
        }
      );

      if (updatingSneaker[0] === 0) {
        throw { name: "UPDATE_FAILED" };
      }
      console.log(updatingSneaker[0], "updatingSneaker");

      res.status(200).json({
        message: "Sneaker has been updated",
      });
    } catch (error) {
      console.log(error, "error di updateSneaker");

      next(error);
    }
  }

  static async deleteSneaker(req, res, next) {
    try {
      const { id } = req.params;

      const findSneakerById = await Sneaker.findByPk(id);

      if (!findSneakerById) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const deletinSneaker = await Sneaker.destroy({
        where: {
          id,
        },
      });

      if (deletinSneaker === 0) {
        throw { name: "DELETE_FAILED" };
      }

      res.status(200).json({
        message: "Sneaker has been deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  Controller,
};
