const router = require("express").Router();

const {
  createTodo,
  getAllTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

// Create a todo
router.post("/", createTodo);

// Get all todos
router.get("/", getAllTodo);

// Get a todo
router.get("/:id", getTodo);

// Update a todo
router.put("/:id", updateTodo);

// Delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;