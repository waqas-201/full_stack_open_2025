const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/:id", async (req, res, next) => {
  console.log("controler triggerd ..... from api/blog/:id");

  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(403)
        .json({ error: { message: "no blog found by this id " } });
    }
    return res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});
blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", "-password");

    console.log(blogs);

    if (!blogs) {
      return res.status(404).json({ error: "No blogs found" });
    }
    return res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (req, res, next) => {
  const user = req.user;
  console.log(user);

  const { title, author, likes } = req.body;
  // we need to check user here also

  try {
    if (!title || !author || !likes) {
      return res
        .status(400)
        .json({ error: "missing one or more then one fields " });
    }
    const blog = new Blog({ ...req.body, likes: 0, user: user.id });

    const savedBlogPost = await blog.save();
    user.blogs = user.blogs?.concat(savedBlogPost.id);
    await user.save();
    return res.status(201).json(savedBlogPost);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  //we need id of the resouce we wanna delete
  const { id } = req.params;
  const user = req.user;
  if (!id) {
    return res.status(400).json({ error: "id param is missing" });
  }
  //first user must be logged in to do this operation
  // only user who own blogspost can delete
  try {
    const result = await Blog.deleteOne({ _id: id, user: user.id });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    return res.status(400).json({ error: "id param is missing" });
  }

  try {
    const savedBlogPost = await Blog.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(savedBlogPost);
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






