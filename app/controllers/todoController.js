const Todo = require("../models/todoModel");

// Create a todo
const createTodo = async (req, res) => {
  res.send("Create a Todo");
}

// Get all todos
const getAllTodo = async (req, res) => {
  res.send("Get All Todo");
}

// Get a todo
const getTodo = async (req, res) => {
  res.send("Get a Todo");
}

// Update a todo
const updateTodo = async (req, res) => {
  res.send("Update a Todo");
}

// Delete a todo
const deleteTodo = async (req, res) => {
  res.send("Delete a Todo");
}

module.exports = {
  createTodo,
  getAllTodo,
  getTodo,
  updateTodo,
  deleteTodo,
}