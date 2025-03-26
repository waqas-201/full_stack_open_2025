const User = require("../models/user");
var jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

const userExtractor = async (req, res, next) => {
  try {
    const decodeToken = jwt.verify(req.token, SECRET);
    const user = await User.findById(decodeToken.id);
    if (!user) {
      return response.status(400).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userExtractor;
