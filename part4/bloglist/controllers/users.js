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
    res.status(201).json(responce);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const responce = await User.find({});
    const alterdResponce = responce.map((user) => {
      return {
        username: user.username,
        name: user.name,
        id: user.id,
      };
    });
    res.status(200).json(alterdResponce);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
