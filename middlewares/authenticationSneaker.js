const { Sneaker, User } = require("../models/index");

async function authenticationSneaker(req, res, next) {
  try {
    const { id } = req.params;

    const findSneaker = await Sneaker.findByPk(id);

    if (!findSneaker) {
      throw { name: "DATA_NOT_FOUND" };
    }

    if (req.user.id === findSneaker.UserId || req.user.role === "Admin") {
      next();
    } else {
      throw { name: "FORBIDDEN" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticationSneaker,
};
