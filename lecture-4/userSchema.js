const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "India",
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

// module.exports = mongoose.model("User", userSchema);
