const { LIMIT } = require("../privateConstants");
const followSchema = require("../schemas/followSchema");
const userSchema = require("../schemas/userSchema");

const followUser = ({ followerUserId, followingUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followExist = await followSchema.findOne({
        $and: [{ followerUserId, followingUserId }],
      });

      if (followExist) return reject("Already following the user");

      const followObj = new followSchema({
        followerUserId,
        followingUserId,
        creationDateTime: Date.now(),
      });

      const followDb = await followObj.save();
      resolve(followDb);
    } catch (error) {
      reject(error);
    }
  });
};

const getFollowinglist = ({ followerUserId, SKIP }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const followingUserDb = await followSchema
      //   .find({ followerUserId })
      //   .populate("followingUserId")
      //   .sort({ creationDateTime: -1 })
      //   .skip(SKIP)
      //   .limit(LIMIT);
      // console.log(followingUserDb);
      const followingList = await followSchema.aggregate([
        {
          $match: { followerUserId: followerUserId },
        },
        {
          $sort: { creationDateTime: -1 },
        },
        {
          $skip: SKIP,
        },
        {
          $limit: LIMIT,
        },
      ]);
      // console.log(followingList);
      const followingUserIds = followingList.map(
        (user) => user.followingUserId
      );
      // console.log(followingUserIds);
      const userDetails = await userSchema.find({
        _id: { $in: followingUserIds },
      });
      // console.log(userDetails);
      resolve(userDetails.reverse());
    } catch (error) {
      reject(error);
    }
  });
};

const getFollowerlist = ({ followingUserId, SKIP }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followerList = await followSchema.aggregate([
        {
          $match: { followingUserId: followingUserId },
        },
        {
          $sort: { creationDateTime: -1 },
        },
        {
          $skip: SKIP,
        },
        {
          $limit: LIMIT,
        },
      ]);
      console.log(followerList);
      const followerUserIdsList = followerList.map(
        (follow) => follow.followerUserId
      );
      console.log(followerUserIdsList);

      const followerUserDataDb = await userSchema.find({
        _id: { $in: followerUserIdsList },
      });
      console.log(followerUserDataDb);
      resolve(followerUserDataDb.reverse());
    } catch (error) {
      reject(error);
    }
  });
};

const unfollowUser = ({ followingUserId, followerUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteDb = await followSchema.deleteOne({
        followingUserId,
        followerUserId,
      });
      resolve(deleteDb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  followUser,
  getFollowinglist,
  getFollowerlist,
  unfollowUser,
};
