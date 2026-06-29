const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// Dashboard
router.get("/admin", adminController.dashboard);

// Products
router.get("/admin/products", adminController.products);

router.get("/admin/products/add", adminController.addProductPage);
router.post("/admin/products/add", adminController.addProduct);

router.get("/admin/products/edit/:id", adminController.editProductPage);
router.post("/admin/products/edit/:id", adminController.updateProduct);

router.get("/admin/products/delete/:id", adminController.deleteProduct);

// Users
router.get("/admin/users", adminController.users);

// Orders
router.get("/admin/orders", adminController.orders);

module.exports = router;