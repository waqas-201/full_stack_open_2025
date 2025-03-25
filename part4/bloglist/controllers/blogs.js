const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response, next) => {
  try {
    const savedBlogPost = await Blog.find({}).populate("user");
    /// savedBlogPost.user.password = undefined;

    const sanitizedBlogs = savedBlogPost.map((blog) => {
      const newUser = {
        username: blog.user.username,
        name: blog.user.name,
        blogs: blog.user.blogs,
        id: blog.user.id,
      };

      return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
        user: newUser,
        id: blog.id,
      };
    });

    response.json(sanitizedBlogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const { title, author, likes, userId } = request.body;
  // we need to check user here also
  let user;
  try {
    user = await User.findById(userId);

    if (!user) {
      return response.status(400).json({ error: "user not found " });
    }
  } catch (error) {
    next(error);
  }

  if (!title || !author) {
    return response
      .status(400)
      .json({ error: "missing one or more then one fields " });
  }
  const blog = new Blog({ ...request.body, likes: 0, user: userId });
  try {
    const savedBlogPost = await blog.save();
    user.blogs = user.blogs.concat(savedBlogPost.id);
    await user.save();
    return response.status(201).json(savedBlogPost);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  //we need id of the resouce we wanna delete
  const { id } = request.params;
  if (!id) {
    return response.status(400).json({ error: "id param is missing" });
  }
  try {
    await Blog.findByIdAndDelete(id);
    response.status(200).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.patch("/:id", async (request, response, next) => {
  const { id } = request.params;
  const data = request.body;

  if (!id) {
    return response.status(400).json({ error: "id param is missing" });
  }

  try {
    const savedBlogPost = await Blog.findByIdAndUpdate(id, data, { new: true });
    response.status(200).json(savedBlogPost);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/", async (req, res, next) => {
  try {
    const deleteAllBlogs = await Blog.deleteMany();
    return res.status(200).json(deleteAllBlogs);
  } catch (error) {
    next(error);
  }
});


module.exports = blogRouter;






