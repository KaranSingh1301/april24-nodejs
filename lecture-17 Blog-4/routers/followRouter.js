const express = require("express");
const {
  followUserController,
  getFollowinglistController,
} = require("../controllers/followController");
const followRouter = express.Router();

followRouter.post("/follow-user", followUserController);
followRouter.get("/following-list", getFollowinglistController);
module.exports = followRouter;
