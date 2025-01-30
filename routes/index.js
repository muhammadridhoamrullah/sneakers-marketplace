const { Controller } = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");
const {
  authenticationPreorder,
} = require("../middlewares/authenticationPreorder");
const {
  authenticationSneaker,
} = require("../middlewares/authenticationSneaker");
const { authorizationAdmin } = require("../middlewares/authorizationAdmin");
const { errorHandling } = require("../middlewares/errorHandler");

const router = require("express").Router();

// ### Endpoint Otentikasi

// - `POST /register`
// - `POST /login`

router.post("/register-user", Controller.registerUser);
router.post("/login", Controller.login);

// AUTHENTICATION!!!
router.use(authentication);

// ### Endpoint Sneaker (Terotentikasi)

// - `GET /sneakers` //
// - `POST /sneakers` //
// - `GET /sneakers/:id` //
// - `GET /brands`
// - `GET /sneakers/popular`

router.get("/sneakers", Controller.getAllSneakers);

router.post("/sneakers", Controller.addSneaker);
router.get("/sneakers/popular", Controller.getPopularSneakers);
router.get("/sneakers/user", Controller.getSneakerByUserId);

router.get("/sneakers/:id", Controller.getSneakerById);
router.get("/sneakers/brand/:brand", Controller.getSneakerByBrand);

router.get("/brands", Controller.getAllBrands);

// ### Endpoint Manajemen Sneaker (Terotentikasi)

// - `PUT /sneakers/:id`
// - `DELETE /sneakers/:id`

router.put("/sneakers/:id", authenticationSneaker, Controller.updateSneaker);
router.delete("/sneakers/:id", authenticationSneaker, Controller.deleteSneaker);

// ### Endpoint Lelang (Terotentikasi)

// - `POST /auctions`
// - `GET /auctions`
// - `GET /auctions/:id`
// - `POST /auctions/:id/bid`
// - `GET /auctions/:id/bids`

router.get("/auctions", Controller.getAllAuctions);
router.get("/auctions/user", Controller.getAuctionByUserId);
router.post("/add-auctions/:id", Controller.addAuction);
router.get("/auctions/:id", Controller.getAuctionById);

router.post("/auctions/:id/bid", Controller.bidAuction);
router.get("/auctions/:id/bids", Controller.getBidByAuctionId);
router.post("/auctions/:id/end", Controller.endAuction);

// ### Endpoint Preorder (Terotentikasi)

// - `POST /preorders`
// - `GET /preorders`
// - `GET /preorders/:id`
// - `PATCH /preorders/:id/status`
// - `GET /user/preorders`

router.post("/preorders", Controller.addPreorder);
router.get("/preorders", Controller.getAllPreorders);
router.get("/preorders/:id", Controller.getPreorderById);
router.patch(
  "/preorders/:id/status",
  authenticationPreorder,
  Controller.updatePreorderStatus
);
router.get("/user/preorders", Controller.getPreorderByUserId);

// ### Endpoint Verifikasi dan Rating User

// - `POST /authenticity-check`
// - `PATCH /user/verify-reseller`
// - `GET /user/ratings`
// - `POST /user/:id/rating`

router.post(
  "/authenticity-check/:id",
  authorizationAdmin,
  Controller.authenticityCheck
);
router.patch(
  "/user/verify-reseller/:id",
  authorizationAdmin,
  Controller.verifyReseller
);

router.use(errorHandling);

module.exports = {
  router,
};
