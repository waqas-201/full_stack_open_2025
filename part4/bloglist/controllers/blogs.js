const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  console.log("api hit on   /api/blogs ");
  const result = await Blog.find({});
  response.json(result);
});

blogRouter.post("/", (request, response, next) => {
  const { title } = request.body;
  if (!title) {
    return response.status(400).json({ error: "missing title property" });
  }
  const blog = new Blog({ ...request.body, likes: 0 });
  console.log(blog);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
