const { Controller } = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");
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

// - `GET /sneakers`
// - `POST /sneakers`
// - `GET /sneakers/:id`
// - `GET /brands`
// - `GET /sneakers/popular`
// - `GET /sneakers/upcoming-releases`
// - `POST /sneakers/:id/legit-check-images`

router.get("/sneakers", Controller.getAllSneakers);
router.post("/sneakers", Controller.addSneaker);

router.use(errorHandling);

module.exports = {
  router,
};
