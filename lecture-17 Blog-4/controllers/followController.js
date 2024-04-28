const { followUser, getFollowinglist } = require("../models/followModel");
const User = require("../models/userModel");

const followUserController = async (req, res) => {
  // userA (followerUserId) ---> userB (followingUserId)
  const followerUserId = req.session.user.userId;
  const followingUserId = req.body.followingUserId;

  console.log(followerUserId, followingUserId);

  try {
    await User.findUserWithKey({ key: followerUserId });
  } catch (error) {
    return res.send({
      status: 400,
      message: "follower userId not found",
    });
  }

  try {
    await User.findUserWithKey({ key: followingUserId });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 400,
      message: "followering userId not found",
      error: error,
    });
  }

  try {
    const followDb = await followUser({ followerUserId, followingUserId });
    console.log(followDb);
    return res.send({
      status: 201,
      message: "Follow successfull",
      data: followDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Data base error",
      error: error,
    });
  }
};

const getFollowinglistController = async (req, res) => {
  const followerUserId = req.session.user.userId;
  const SKIP = Number(req.query.skip) || 0;

  try {
    const followDb = await getFollowinglist({ followerUserId, SKIP });

    return res.send({
      status: 200,
      message: "Read success",
      data: followDb,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
};

module.exports = { followUserController, getFollowinglistController };

// test -->test1
// test -->test2
//test --->test3
