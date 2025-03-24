const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const assert = require("assert");
const Blog = require("../models/blog");

const api = supertest(app);
const blogs = [
  {
    title: "hello part5666",
    author: "waqas",
  },
  {
    title: "his/her blog post",
    author: "some one else ",
  },
];
beforeEach(async () => {
  // delete all blogs
  await Blog.deleteMany({});
  // seed new data

  const blogObject = blogs.map((blog) => {
    return new Blog(blog);
  });

  console.log(blogObject);

  await Promise.all(blogObject.map((blog) => blog.save()));

  const responce = await api.get("/api/blogs");

  console.log(responce.body);
});

test("blogs must be returned as json output", async () => {
  api
    .get("/api/blogs")
    .expect(200)
    .expect("content-type", /application\/json/);
});
test("each blog must have uniuqe id property ", async () => {
  const blogs = await api.get("/api/blogs");

  blogs.body.map((blog) => {
    assert(blog["id"], true);
  });
});
test.only("Write a test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
  // create data to seed db
  const postData = {
    title: "usman's first post",
    author: "usman",
  };

  // do a post request
  const postReponce = await api
    .post("/api/blogs")
    .send(postData)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  // verify dos it took effect
  const postReponceData = {
    author: postReponce.body.author,
    title: postReponce.body.title,
  };
  const responce = await api.get("/api/blogs");

  assert.strictEqual(blogs.length + 1, responce.body.length);
  assert.deepStrictEqual(postReponceData, postData);
});
after(async () => {
  await mongoose.connection.close();
});
