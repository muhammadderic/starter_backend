const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const todoRoutes = require("./app/routes/todoRoutes");

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("database is connected"))
  .then(
    // Listen
    () => app.listen(process.env.PORT, () => {
      console.log("server is listening on port:", process.env.PORT);
    })
  )
  .catch(error => {
    console.error({ message: error.message });
  })

// Routes
app.use("/api/v1/todos", todoRoutes);