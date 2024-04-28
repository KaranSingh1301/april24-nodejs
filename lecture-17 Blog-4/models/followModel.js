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

      await followObj.save();
      resolve(followObj);
    } catch (error) {
      reject(error);
    }
  });
};

const getFollowinglist = ({ followerUserId, SKIP }) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      console.log(followingList);
      const followingUserIds = followingList.map(
        (user) => user.followingUserId
      );
      console.log(followingUserIds);
      const userDetails = await userSchema.find({
        _id: { $in: followingUserIds },
      });
      console.log(userDetails);
      resolve(userDetails.reverse());
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { followUser, getFollowinglist };
