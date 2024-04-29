const express = require("express");
const {
  createBlogController,
  readMyBlogController,
  readAllBlogController,
  editBlogController,
  deleteBlogController,
} = require("../controllers/blogController");
const rateLimiting = require("../middlewares/ratelimitingMiddeware");

const blogRouter = express.Router();

blogRouter.post("/create-blog", rateLimiting, createBlogController);
blogRouter.get("/get-blogs", readAllBlogController);
blogRouter.get("/get-myblogs", readMyBlogController);
blogRouter.post("/edit-blog", editBlogController);
blogRouter.post("/delete-blog", deleteBlogController);

module.exports = blogRouter;
