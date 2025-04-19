const commentRouter = require("express").Router();
const Comment = require("../models/comment");

commentRouter.post("/", async (req, res, next) => {
  const { blogId, commentMessage } = req.body;
  if (!blogId || !commentMessage) {
    return res
      .status(403)
      .json({ error: { message: "required field are missing " } });
  }

  try {
    const comment = await Comment.create({
      blog: blogId,
      message: commentMessage,
    });
    console.log(comment);

    if (!comment) {
      return res
        .status(500)
        .json({ error: { message: "filed to create  comment " } });
    }
    return res.status(201).json(comment);
  } catch (error) {
    console.log(error);

    next(error);
  }
});
commentRouter.get("/:blogId", async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const comment = await Comment.find({ blog: blogId }).populate("blog");

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});
module.exports = commentRouter;
