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
  } else if (err.name === "DATA_NOT_FOUND") {
    res.status(404).json({ message: "Data Not Found" });
  } else if (err.name === "FORBIDDEN") {
    res.status(403).json({ message: "You Have No Access" });
  } else if (err.name === "UPDATE_FAILED") {
    res.status(400).json({ message: "Update Failed" });
  } else if (err.name === "DELETE_FAILED") {
    res.status(400).json({ message: "Delete Failed" });
  } else if (err.name === "INVALID_INPUT_AUCTION") {
    res.status(400).json({
      message:
        "SneakerId, startingPrice, minBidIncrement, startTime, endTime is required",
    });
  } else if (err.name === "AUCTION_CLOSED") {
    res.status(400).json({ message: "Auction is Closed" });
  } else if (err.name === "INVALID_AMOUNT") {
    res.status(400).json({ message: "Invalid Input Amount" });
  } else if (err.name === "AMOUNT_REQUIRED") {
    res.status(400).json({ message: "Amount is required" });
  } else if (err.name === "INVALID_AMOUNT_MIN") {
    res
      .status(400)
      .json({ message: "Amount must be higher minimum bid increment" });
  } else if (err.name === "NO_BIDS_FOUND") {
    res.status(404).json({ message: "No Bids Found" });
  } else if (err.name === "INVALID_INPUT_PREORDER") {
    res.status(400).json({
      message:
        "Name, Brand, Release Date, Expected Devlivery Date, Price, Retail Price, Description, Image URL, Total Slots, Remaining Slots is required",
    });
  } else if (err.name === "INVALID_INPUT_UPDATE_PREORDERSTATUS") {
    res.status(400).json({
      message: "Status is required",
    });
  } else if (err.name === "ALREADY_AUTHENTIC_CHECKED") {
    res.status(400).json({ message: "Sneaker is already authenticated" });
  } else if (err.name === "INVALID_INPUT_AUTHENTICITY_STATUS") {
    res.status(400).json({ message: "Authenticity Status is required" });
  } else if (err.name === "USER_NOT_SELLER") {
    res.status(400).json({ message: "User not seller" });
  } else if (err.name === "USER_ALREADY_VERIFIED") {
    res.status(400).json({ message: "User (Seller) already verified" });
  } else if (err.name === "INVALID_INPUT_VERIFY_RESELLER") {
    res.status(400).json({
      message: "Is Verified Reseller and Verifiaction Status is required",
    });
  } else if (err.name === "INVALID_DATE_AUCTION") {
    res.status(400).json({ message: "End Time must be later than Start Time" });
  } else if (err.name === "INVALID_BUY_NOW_PRICE") {
    res
      .status(400)
      .json({ message: "Buy Now Price must be higher than Starting Price" });
  } else if (err.name === "SNEAKER_ALREADY_IN_AUCTION") {
    res.status(400).json({ message: "Sneaker is already in auction" });
  }
}

module.exports = {
  errorHandling,
};
