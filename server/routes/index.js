const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const todoRoutes = require("./todoRoutes");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.use("/auth", authRoutes);
router.use("/todos", isAuthenticated, todoRoutes);

module.exports = router;
