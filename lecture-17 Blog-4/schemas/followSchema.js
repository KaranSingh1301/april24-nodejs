const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema({
  followerUserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  followingUserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  creationDateTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("follow", followSchema);

//test -->test1
//test --->test2
//test1--->test2
