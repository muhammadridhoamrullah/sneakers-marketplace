async function errorHandling(err, req, res, next) {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const errors = err.errors.map((el) => {
      return el.message;
    });
    res.status(400).json({ message: errors[0] });
  } else if (err.name === "EMAIL_PASSWORD_REQUIRED") {
    res.status(400).json({ message: "Email and Password is required" });
  } else if (err.name === "INVALID_EMAIL_PASSWORD") {
    res.status(400).json({ message: "Invalid Email or Password" });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid Token" });
  } else if (err.name === "SequelizeDatabaseError") {
    res.status(400).json({ message: "Invalid input" });
  } else if (err.name === "UNAUTHORIZED") {
    res.status(401).json({ message: "Please Login First!" });
  } else if (err.name === "INVALID_INPUT_SNEAKER") {
    res.status(400).json({
      message:
        "Name, Price, Brand, Release Year, Size, Condition, Colorway, Image URL, Box is required",
    });
  }
}

module.exports = {
  errorHandling,
};
