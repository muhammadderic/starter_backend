const router = require("express").Router();

// Create a todo
router.post("/", (req, res) => {
  res.send("Create a Todo");
})

// Get all todos
router.get("/", (req, res) => {
  res.send("Get All Todo");
})

// Get a todo
router.get("/:id", (req, res) => {
  res.send("Get a Todo");
})

// Update a todo
router.put("/:id", (req, res) => {
  res.send("Update a Todo");
})

// Delete a todo
router.delete("/:id", (req, res) => {
  res.send("Delete a Todo");
})

module.exports = router;