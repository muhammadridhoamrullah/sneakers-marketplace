async function authorizationAdmin(req, res, next) {
  try {
    if (req.user.role === "Admin") {
      next();
    } else {
      throw { name: "FORBIDDEN" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authorizationAdmin,
};
