const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 100,
  },
  textBody: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 1000,
  },
  creationDateTime: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId, //FK to user table
    required: true,
    ref: "user",
  },
});

module.exports = mongoose.model("blog", blogSchema);
