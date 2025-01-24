const { Preorder, User } = require("../models/index");

async function authenticationPreorder(req, res, next) {
  try {
    const { id } = req.params;

    const findPreorder = await Preorder.findByPk(id, {
      include: {
        model: User,
        attibutes: {
          exclude: ["password"],
        },
      },
    });

    if (!findPreorder) {
      throw { name: "DATA_NOT_FOUND" };
    }

    if (findPreorder.UserId === req.user.id || req.user.role === "Admin") {
      next();
    } else {
      throw { name: "FORBIDDEN" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticationPreorder,
};
