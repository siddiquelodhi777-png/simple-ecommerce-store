const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/register", userController.registerPage);

router.post("/register", userController.registerUser);

router.get("/login", userController.loginPage);

router.post("/login", userController.loginUser);

router.get("/logout", userController.logout);

module.exports = router;