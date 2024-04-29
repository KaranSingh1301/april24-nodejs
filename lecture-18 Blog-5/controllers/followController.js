const {
  followUser,
  getFollowinglist,
  getFollowerlist,
  unfollowUser,
} = require("../models/followModel");
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

const getFollowerlistController = async (req, res) => {
  const followingUserId = req.session.user.userId;
  const SKIP = Number(req.query.skip) || 0;

  try {
    const followingUserDataDb = await getFollowerlist({
      followingUserId,
      SKIP,
    });

    return res.send({
      status: 200,
      message: "Read success",
      data: followingUserDataDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
};

const unfollowUserController = async (req, res) => {
  const followerUserId = req.session.user.userId;
  const followingUserId = req.body.followingUserId;

  if (!followerUserId || !followingUserId) {
    return res.send({
      status: 400,
      message: "Id's are missing",
    });
  }

  try {
    const followDb = await unfollowUser({ followerUserId, followingUserId });

    return res.send({
      status: 200,
      message: "Delete successfull",
      data: followDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
};

module.exports = {
  followUserController,
  getFollowinglistController,
  getFollowerlistController,
  unfollowUserController,
};

// test -->test1
// test -->test2
//test --->test3
///test2--->test
//test3---->test
//test4----->test
//test5----->test
