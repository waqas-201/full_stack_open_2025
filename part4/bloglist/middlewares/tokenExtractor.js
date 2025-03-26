const tokenExtractor = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is required" });
  }
  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid authorization format" });
  }
  const token = authorization.replace("Bearer ", "");
  req.token = token;
  next();
};

module.exports = tokenExtractor;
