const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware.js");
const wishlistController = require("../controllers/wishlists.js");

router.get("/", isLoggedIn, wishlistController.renderWishlist);

router.post("/:id", isLoggedIn, wishlistController.addToWishlist);

router.delete("/:id", isLoggedIn, wishlistController.removeFromWishlist);

module.exports = router;