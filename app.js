const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", (req, res) => {
  res.send("Hello Deric");
})

// Listen
app.listen(process.env.PORT, () => {
  console.log("server is listening on port:", process.env.PORT);
})