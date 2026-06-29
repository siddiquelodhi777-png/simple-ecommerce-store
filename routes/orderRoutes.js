const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

// Checkout Page
router.get("/checkout", orderController.checkoutPage);
// My Orders
router.get("/my-orders", orderController.myOrders);

// Place Order
router.post("/place-order", orderController.placeOrder);

module.exports = router;