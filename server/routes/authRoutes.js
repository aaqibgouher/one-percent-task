const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { isAuthenticated } = require("../middleware/authMiddleware");

// register
router.post("/register", authController.register);

// login
router.post("/login", authController.login);

// get me
router.get("/me", isAuthenticated, authController.getMe);

// logout
router.get("/logout", isAuthenticated, authController.logout);

// export
module.exports = router;
