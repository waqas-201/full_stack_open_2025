const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = require("./app");
const blogRouter = require("./controllers/blogs");
const { MONGODB_URI } = require("./utils/config");

mongoose
  .connect(MONGODB_URI)

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
