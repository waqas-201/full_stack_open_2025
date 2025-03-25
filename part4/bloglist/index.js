const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const { MONGODB_URI } = require("./utils/config");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true, // Only for development!
  })
  .then(async () => {
    console.log("connected to database successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });


module.exports = app;
