const mongoose = require("mongoose");


mongoose.set("strictQuery", false);

const config = require("./utils/config.js");

console.log("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 5, required: true },
  number: {
    type: String, // Use String instead of Number
    required: [true, "User phone number required"],
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{6,8}$/.test(v); // Correct regex syntax
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

module.exports = mongoose.model("phonebook", personSchema);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
