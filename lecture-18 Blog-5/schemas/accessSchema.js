const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accessSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("access", accessSchema);
