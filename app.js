const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const todoRoutes = require("./app/routes/todoRoutes");

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/todos", todoRoutes);

// Listen
app.listen(process.env.PORT, () => {
  console.log("server is listening on port:", process.env.PORT);
})