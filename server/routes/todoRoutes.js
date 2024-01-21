const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", todoController.getUserTodos);
router.post("/", todoController.addUserTodo);
router.delete("/:todoId", todoController.deleteUserTodo);
router.patch("/:todoId", todoController.editUserTodo);
router.get("/stats", todoController.getStats);

module.exports = router;
