const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const authRouter = require("./controllers/auth");
const errorHandler = require("./utils/errorHandler");
const { MONGODB_URI } = require("./utils/config");
const tokenExtractor = require("./middlewares/tokenExtractor");
const userExtractor = require("./middlewares/userExtractor");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/blogs", tokenExtractor, userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("connected to database successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(errorHandler);
module.exports = app;
