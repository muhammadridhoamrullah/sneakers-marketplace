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
        isVerifiedReseller: false,
        resellerVerificationStatus: "Unverified",
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
        authenticityStatus: "Unverified",
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

  static async addAuction(req, res, next) {
    try {
      const {
        startingPrice,
        reservePrice,
        minBidIncrement,
        startTime,
        endTime,
        buyNowPrice,
      } = req.body;
      const { id } = req.params;
      if (!startingPrice || !minBidIncrement || !startTime || !endTime) {
        throw { name: "INVALID_INPUT_AUCTION" };
      }
      const cekstartingPrice = parseFloat(req.body.startingPrice);
      const cekbuyNowPrice = parseFloat(req.body.buyNowPrice);
      console.log(typeof startingPrice, "cekstartingPrice");
      console.log(typeof buyNowPrice, "cekbuyNowPrice");

      if (
        Date.parse(startTime) < Date.now() ||
        Date.parse(endTime) < Date.parse(startTime) ||
        Date.parse(endTime) < Date.now()
      ) {
        throw { name: "INVALID_DATE_AUCTION" };
      }

      if (buyNowPrice < startingPrice) {
        throw { name: "INVALID_BUY_NOW_PRICE" };
      }
      const findSneaker = await Sneaker.findByPk(id);

      if (!findSneaker) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const findSneakerInAuction = await Auction.findOne({
        where: {
          SneakerId: id,
        },
      });

      if (findSneakerInAuction) {
        throw { name: "SNEAKER_ALREADY_IN_AUCTION" };
      }

      if (findSneaker.UserId === req.user.id || req.user.role === "Admin") {
        const addToAuction = await Auction.create({
          SneakerId: id,
          startingPrice,
          currentPrice: startingPrice,
          reservePrice,
          minBidIncrement,
          startTime,
          endTime,
          buyNowPrice,
          status: "Active",
          UserId: req.user.id,
        });

        res.status(201).json({
          message: "Auction has been added",
          data: addToAuction,
        });
      } else {
        throw { name: "FORBIDDEN" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllAuctions(req, res, next) {
    try {
      const allAuctions = await Auction.findAll({
        include: [
          {
            model: Sneaker,
          },
          {
            model: User,
            as: "Seller",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: User,
            as: "Winner",
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });

      res.status(200).json({
        data: allAuctions,
      });
    } catch (error) {
      console.log(error, "error di getAllAuctions");

      next(error);
    }
  }

  static async getAuctionById(req, res, next) {
    try {
      const { id } = req.params;

      const findAuctionById = await Auction.findByPk(id, {
        include: [
          {
            model: Sneaker,
          },
          {
            model: User,
            as: "Seller",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: User,
            as: "Winner",
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });

      if (!findAuctionById) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).json({
        data: findAuctionById,
      });
    } catch (error) {
      next(error);
    }
  }

  static async bidAuction(req, res, next) {
    try {
      const { id } = req.params;
      const { amount } = req.body;

      const findAuction = await Auction.findByPk(id, {
        include: {
          model: Sneaker,
        },
      });

      console.log(findAuction, "findAuction");

      if (!findAuction) {
        throw { name: "DATA_NOT_FOUND" };
      }

      if (findAuction.status === "Closed") {
        throw { name: "AUCTION_CLOSED" };
      }
      if (!amount) {
        throw { name: "AMOUNT_REQUIRED" };
      }

      if (amount < findAuction.minBidIncrement) {
        throw { name: "INVALID_AMOUNT_MIN" };
      }

      const findHighestBid = await Bid.findOne({
        where: {
          AuctionId: id,
          isHighestBid: true,
        },
      });

      console.log(findHighestBid, "findHighestBid");

      if (findHighestBid) {
        if (amount < findHighestBid.amount + findAuction.minBidIncrement) {
          throw { name: "INVALID_AMOUNT" };
        }

        await Bid.update(
          { isHighestBid: false },
          { where: { id: findHighestBid.id } }
        );
      }
      console.log("Jalan");

      const newBid = await Bid.create({
        AuctionId: id,
        UserId: req.user.id,
        amount,
        autoBidLimit: 0,
        isHighestBid: true,
        timestamp: new Date(),
        status: "Active",
      });
      console.log("Jalan 2");

      await Auction.update(
        { currentPrice: amount, totalBids: findAuction.totalBids + 1 },
        { where: { id } }
      );
      console.log("Jalan 3");

      res.status(201).json({
        message: "Bid has been placed",
        data: newBid,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBidByAuctionId(req, res, next) {
    try {
      const { id } = req.params;

      const findBidByAuctionId = await Bid.findAll({
        where: {
          AuctionId: id,
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Auction,
            include: {
              model: Sneaker,
            },
          },
        ],
        order: [["amount", "DESC"]],
      });

      if (findBidByAuctionId.length === 0) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).json({
        data: findBidByAuctionId,
      });
    } catch (error) {
      next(error);
    }
  }

  static async endAuction(req, res, next) {
    try {
      const { id } = req.params;

      const findAuction = await Auction.findByPk(id, {
        include: {
          model: Bid,
          include: {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        },
      });

      if (!findAuction) {
        throw { name: "DATA_NOT_FOUND" };
      }

      if (findAuction.status === "Closed") {
        throw { name: "AUCTION_CLOSED" };
      }

      if (req.user.role === "Admin" || req.user.id === findAuction.UserId) {
        const highestBid = await Bid.findOne({
          where: {
            AuctionId: id,
            isHighestBid: true,
          },
          include: {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        });

        if (!highestBid) {
          throw { name: "NO_BIDS_FOUND" };
        }

        await Auction.update(
          { status: "Closed", WinnerId: highestBid.UserId },
          { where: { id } }
        );

        res.status(200).json({
          message: "Auction is finished",
          winner: highestBid.User,
          winningBid: highestBid.amount,
        });
      } else {
        throw { name: "FORBIDDEN" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async addPreorder(req, res, next) {
    try {
      if (req.user.role === "Admin" || req.user.role === "Seller") {
        const {
          name,
          brand,
          releaseDate,
          expectedDeliveryDate,
          price,
          retailPrice,
          description,
          imageUrl,
          retailStore,
          guaranteed,
          refundPolicy,
          totalSlots,
          remainingSlots,
        } = req.body;

        if (
          !name ||
          !brand ||
          !releaseDate ||
          !expectedDeliveryDate ||
          !price ||
          !retailPrice ||
          !description ||
          !imageUrl ||
          !totalSlots ||
          !remainingSlots
        ) {
          throw { name: "INVALID_INPUT_PREORDER" };
        }

        const addingPreorder = await Preorder.create({
          name,
          brand,
          releaseDate,
          expectedDeliveryDate,
          price,
          retailPrice,
          description,
          imageUrl,
          retailStore,
          guaranteed,
          refundPolicy,
          totalSlots,
          remainingSlots,
          status: "Active",
          UserId: req.user.id,
        });

        res.status(201).json({
          message: "Preorder has been added",
          data: addingPreorder,
        });
      } else {
        throw { name: "FORBIDDEN" };
      }
    } catch (error) {
      console.log(error, "error di addPreorder");

      next(error);
    }
  }

  static async getAllPreorders(req, res, next) {
    try {
      const allPreorders = await Preorder.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        order: [["releaseDate", "DESC"]],
        where: {
          status: "Active",
        },
      });

      res.status(200).json({
        data: allPreorders,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPreorderById(req, res, next) {
    try {
      const { id } = req.params;

      const findPreorderById = await Preorder.findByPk(id, {
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });

      if (!findPreorderById) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).json({
        data: findPreorderById,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePreorderStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const findPreorderById = await Preorder.findByPk(id, {
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });

      if (!findPreorderById) {
        throw { name: "DATA_NOT_FOUND" };
      }

      if (!status) {
        throw { name: "INVALID_INPUT_UPDATE_PREORDERSTATUS" };
      }

      const updatingStatus = await Preorder.update(
        {
          status,
        },
        {
          where: {
            id,
          },
        }
      );

      if (updatingStatus[0] === 0) {
        throw { name: "UPDATE_FAILED" };
      }

      res.status(200).json({
        message: "Preorder status has been updated",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPreorderByUserId(req, res, next) {
    try {
      const findAllpreOrderByUserId = await Preorder.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        where: {
          UserId: req.user.id,
        },
      });

      if (findAllpreOrderByUserId.length === 0) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).json({
        data: findAllpreOrderByUserId,
      });
    } catch (error) {
      next(error);
    }
  }

  static async authenticityCheck(req, res, next) {
    try {
      const { id } = req.params;

      const { authenticityStatus } = req.body;

      const findSneakerToBeCheck = await Sneaker.findByPk(id);
      if (!authenticityStatus) {
        throw { name: "INVALID_INPUT_AUTHENTICITY_STATUS" };
      }
      if (!findSneakerToBeCheck) {
        throw { name: "DATA_NOT_FOUND" };
      }

      if (findSneakerToBeCheck.authenticityStatus === "Verified") {
        throw { name: "ALREADY_AUTHENTIC_CHECKED" };
      }

      await Sneaker.update(
        {
          authenticityStatus,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Sneaker has been checked",
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyReseller(req, res, next) {
    try {
      const { id } = req.params;
      const { isVerifiedReseller, resellerVerificationStatus } = req.body;
      const findUserToBeVerified = await User.findByPk(id);

      if (!isVerifiedReseller || !resellerVerificationStatus) {
        throw { name: "INVALID_INPUT_VERIFY_RESELLER" };
      }
      if (!findUserToBeVerified) {
        throw { name: "DATA_NOT_FOUND" };
      }

      if (findUserToBeVerified.role === "Buyer") {
        throw { name: "USER_NOT_SELLER" };
      }

      if (findUserToBeVerified.isVerified) {
        throw { name: "USER_ALREADY_VERIFIED" };
      }

      await User.update(
        {
          isVerifiedReseller,
          resellerVerificationStatus,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "User has been verified as Verified Seller",
        data: findUserToBeVerified,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSneakerByUserId(req, res, next) {
    try {
      const userId = req.user.id;
      console.log(userId, "ini userId");

      const findSneakerByUserId = await Sneaker.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        where: {
          UserId: userId,
        },
        order: [["createdAt", "ASC"]],
      });
      console.log(findSneakerByUserId, "ini findSneakerByUserId");

      if (findSneakerByUserId.length === 0) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).json({
        data: findSneakerByUserId,
      });
    } catch (error) {
      console.log(error, "error di getSneakerByUserId");

      next(error);
    }
  }

  static async getAuctionByUserId(req, res, next) {
    try {
      const findAuctionByUserId = await Auction.findAll({
        include: {
          model: Sneaker,
        },
        where: {
          UserId: req.user.id,
        },
        order: [["createdAt", "ASC"]],
      });

      if (findAuctionByUserId.length === 0) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).json({
        data: findAuctionByUserId,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  Controller,
};
