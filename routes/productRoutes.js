const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// Home Page
router.get("/", productController.home);

// Product Details
router.get("/product/:id", productController.getProduct);

module.exports = router;