const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

userRouter.post("/", async (req, res, next) => {
  // get name username and password
  const { name, userName, password } = req.body;

  // validate
  if (!name || !userName || !password) {
    return res.status(400).json({ error: "required data is not provided" });
  }

  if (userName.length < 3) {
    return res
      .status(400)
      .json({ error: "username must me at least 3 char long" });
  }

  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: "password must me at least 3 char long" });
  }
  // check uniuqe
  try {
    const checkUniuqe = await User.findOne({ username: userName });
    if (checkUniuqe) {
      return res.status(409).json({ error: "username must me uniuqe" });
    }
  } catch (error) {
    next(error);
  }

  // hash password
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // save everything to db
    const user = new User({
      name: name,
      username: userName,
      password: hashedPass,
    });

    const responce = await user.save();
    responce.password = undefined;
    res.status(201).json(responce);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const responce = await User.find({}).populate("blogs");

    const alterdResponce = responce.map((user) => {
      return {
        username: user.username,
        name: user.name,
        id: user.id,
        blogs: {
          ...user.blogs,
        },
      };
    });
    res.status(200).json(alterdResponce);
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/", async (req, res, next) => {
  try {
    const deleteALlUsers = await User.deleteMany();
    return res.status(200).json(deleteALlUsers);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
