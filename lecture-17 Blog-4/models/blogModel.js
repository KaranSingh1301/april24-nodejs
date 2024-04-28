const { LIMIT } = require("../privateConstants");
const blogSchema = require("../schemas/blogSchema");

const createBlog = ({ title, textBody, userId }) => {
  return new Promise(async (resolve, reject) => {
    const blogObj = new blogSchema({
      title,
      textBody,
      creationDateTime: Date.now(),
      userId,
    });

    try {
      const blogDb = await blogObj.save();
      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllBlogs = ({ SKIP }) => {
  return new Promise(async (resolve, reject) => {
    // pagination and sort
    try {
      const blogDb = await blogSchema.aggregate([
        {
          $sort: { creationDateTime: -1 }, // -1 DESC and 1 ACSD
        },
        {
          $skip: SKIP,
        },
        {
          $limit: LIMIT,
        },
      ]);
      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};

const getMyBlogs = ({ SKIP, userId }) => {
  return new Promise(async (resolve, reject) => {
    //pagination, sort, match
    try {
      const myBlogsDb = await blogSchema.aggregate([
        {
          $match: { userId: userId },
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
      resolve(myBlogsDb);
    } catch (error) {
      reject(error);
    }
  });
};

const getBlogWithId = ({ blogId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!blogId) reject("Missing blogId");
      const blogDb = await blogSchema.findOne({ _id: blogId });

      if (!blogDb) reject(`No blog found with blogId: ${blogId}`);

      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};

const updateBlog = ({ title, textBody, blogId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const prevDataDb = await blogSchema.findOneAndUpdate(
        { _id: blogId },
        { title, textBody }
      );

      resolve(prevDataDb);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteBlog = ({ blogId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteBlogDb = await blogSchema.findOneAndDelete({ _id: blogId });
      resolve(deleteBlogDb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getBlogWithId,
  updateBlog,
  deleteBlog,
};
