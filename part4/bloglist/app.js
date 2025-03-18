const express = require("express");
const app = express();

const { PORT } = require("./utils/config");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
