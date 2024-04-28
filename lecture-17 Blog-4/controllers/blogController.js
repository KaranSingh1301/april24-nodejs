const {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getBlogWithId,
  updateBlog,
  deleteBlog,
} = require("../models/blogModel");
const User = require("../models/userModel");
const { blogDataValidator } = require("../utils/blogUtil");

const createBlogController = async (req, res) => {
  console.log(req.session);

  const { title, textBody } = req.body;
  const userId = req.session.user.userId;

  try {
    await blogDataValidator({ title, textBody });
    await User.findUserWithKey({ key: userId });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 400,
      message: "Blog data error",
      error: error,
    });
  }

  try {
    const blogDb = await createBlog({ title, textBody, userId });

    return res.send({
      status: 201,
      message: "blog created successfull",
      data: blogDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
};

//sorted
//paginated
const readAllBlogController = async (req, res) => {
  const SKIP = parseInt(req.query.skip) || 0;

  try {
    const blogDb = await getAllBlogs({ SKIP });

    if (blogDb.length === 0) {
      return res.send({
        status: 203,
        message: "No more Blogs",
      });
    }

    return res.send({
      status: 200,
      message: "Read success",
      data: blogDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
};

const readMyBlogController = async (req, res) => {
  const SKIP = parseInt(req.query.skip) || 0;
  const userId = req.session.user.userId;

  try {
    const myBlogsDb = await getMyBlogs({ SKIP, userId });

    if (myBlogsDb.length === 0) {
      return res.send({
        status: 203,
        message: "No Blogs found",
      });
    }

    return res.send({
      status: 200,
      message: "Read my blogs success",
      data: myBlogsDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
};

const editBlogController = async (req, res) => {
  console.log(req.body);
  const { title, textBody } = req.body.data;
  const blogId = req.body.blogId;
  const userId = req.session.user.userId;

  try {
    await blogDataValidator({ title, textBody });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Blog data error",
      error: error,
    });
  }

  //find the blog
  //ownership check
  //30 min time constraints

  try {
    const blogDb = await getBlogWithId({ blogId });
    console.log(blogDb);

    // id1.equals(id2)
    // id1.toString()  === id2.toString()

    if (!userId.equals(blogDb.userId)) {
      return res.send({
        status: 403,
        message: "Not allowed to edit this blog",
      });
    }

    console.log((Date.now() - blogDb.creationDateTime) / (1000 * 60));

    const diff = (Date.now() - blogDb.creationDateTime) / (1000 * 60);

    if (diff > 30) {
      return res.send({
        status: 400,
        message: "Not allowed to edit the blog after 30 mins of creation",
      });
    }

    const prevBlogDb = await updateBlog({ title, textBody, blogId });

    return res.send({
      status: 200,
      message: "Blog updated successully",
      data: prevBlogDb,
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

const deleteBlogController = async (req, res) => {
  const userId = req.session.user.userId;
  const blogId = req.body.blogId;

  //find the blog

  try {
    const blogDb = await getBlogWithId({ blogId });

    //ownership  check
    if (!userId.equals(blogDb.userId)) {
      return res.send({
        status: 403,
        message: "Not allowed to delete the blog",
      });
    }

    //delete the DB

    const deleteBlogDb = await deleteBlog({ blogId });

    console.log(deleteBlogDb);

    return res.send({
      status: 200,
      message: "Blog deleted successfully",
      data: deleteBlogDb,
    });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Blog data error",
      error: error,
    });
  }
};

module.exports = {
  createBlogController,
  readAllBlogController,
  readMyBlogController,
  editBlogController,
  deleteBlogController,
};
