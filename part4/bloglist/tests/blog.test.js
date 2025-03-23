const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test.only("blogs must be returned as json output", async () => {
  api
    .get("/api/blogs")
    .expect(200)
    .expect("content-type", /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});
