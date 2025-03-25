const app = require("./index");
const { PORT } = require("./utils/config");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  console.log("file is working in app js  ");
