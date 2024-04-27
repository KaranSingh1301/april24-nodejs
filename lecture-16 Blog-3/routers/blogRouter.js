const express = require("express");
const {
  createBlogController,
  readMyBlogController,
  readAllBlogController,
  editBlogController,
} = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.post("/create-blog", createBlogController);
blogRouter.get("/get-blogs", readAllBlogController);
blogRouter.get("/get-myblogs", readMyBlogController);
blogRouter.post("/edit-blog", editBlogController);

module.exports = blogRouter;
