const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

const todoRoutes = require("./app/routes/todoRoutes");
const viewTodoRoutes = require("./app/routes/viewTodoRoutes");

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");

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

// View routes
app.use("/", viewTodoRoutes);

// Routes
app.use("/api/v1/todos", todoRoutes);