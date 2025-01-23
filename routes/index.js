const { Controller } = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");
const {
  authenticationSneaker,
} = require("../middlewares/authenticationSneaker");
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

router.get("/sneakers/:id", Controller.getSneakerById);
router.get("/sneakers/brand/:brand", Controller.getSneakerByBrand);

router.get("/brands", Controller.getAllBrands);

// ### Endpoint Manajemen Sneaker (Terotentikasi)

// - `PUT /sneakers/:id`
// - `DELETE /sneakers/:id`

router.put("/sneakers/:id", authenticationSneaker, Controller.updateSneaker);
router.delete("/sneakers/:id", authenticationSneaker, Controller.deleteSneaker);

router.use(errorHandling);

module.exports = {
  router,
};
