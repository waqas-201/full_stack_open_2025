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

  await Promise.all(blogObject.map((blog) => blog.save()));

  const responce = await api.get("/api/blogs");
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
test("Write a test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
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

test("Write a test that verifies that if the likes property is missing from the request, ", async () => {
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

  assert("likes" in postReponce.body);
});

test("Write tests related to creating new blogs via the /api/blogs endpoint, that verify that if the title or url properties are missing from the request data,", async () => {
  // create data to seed db
  const postData = {
    author: "usman",
  };

  // do a post request
  await api
    .post("/api/blogs")
    .send(postData)
    .expect(400)
    .expect("Content-Type", /application\/json/);
  // verify dos it took effect
});



after(async () => {
  await mongoose.connection.close();
});
