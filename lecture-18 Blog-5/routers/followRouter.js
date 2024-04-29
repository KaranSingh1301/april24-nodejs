const express = require("express");
const {
  followUserController,
  getFollowinglistController,
  getFollowerlistController,
  unfollowUserController,
} = require("../controllers/followController");
const rateLimiting = require("../middlewares/ratelimitingMiddeware");
const followRouter = express.Router();

followRouter.post("/follow-user", rateLimiting, followUserController);
followRouter.get("/following-list", getFollowinglistController);
followRouter.get("/follower-list", getFollowerlistController);
followRouter.post("/unfollow-user", unfollowUserController);
module.exports = followRouter;
