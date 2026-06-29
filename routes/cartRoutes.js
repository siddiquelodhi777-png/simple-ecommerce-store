const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

// View Cart
router.get("/cart", cartController.viewCart);

// Add to Cart
router.post("/cart/add", cartController.addToCart);

// Remove from Cart
router.get("/cart/remove/:id", cartController.removeFromCart);

module.exports = router;