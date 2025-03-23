const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const assert = require("assert");

const api = supertest(app);

test("blogs must be returned as json output", async () => {
  api
    .get("/api/blogs")
    .expect(200)
    .expect("content-type", /application\/json/);
});

test.only("each blog must have uniuqe id property ", async () => {
  const blogs = await api.get("/api/blogs");

  blogs.body.map((blog) => {
    assert(blog["id"], true);
  });
});

after(async () => {
  await mongoose.connection.close();
});


