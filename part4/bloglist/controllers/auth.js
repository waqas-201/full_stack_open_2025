const authRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

authRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  // validate inputs
  if (!username || !password) {
    return res.status(400).json({ error: "missing crediantials " });
  }
  try {
    //check db is user exists
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ error: "invalid crediantials " });
    }

    // take user password hash
    // compare hash with provided password in request body
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "invalid crediantials " });
    }

    // we identified user now let generate token

    const token = jwt.sign(
      {
        id: user.id,
      },
      "secret",
      { expiresIn: "1h" }
    );
    // generate jwt token and send it back to user frontend

    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {}
});

module.exports = authRouter;
