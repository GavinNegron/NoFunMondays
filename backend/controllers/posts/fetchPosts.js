const Posts = require('../../models/Posts');

const getPosts = async (req, res) => {
  try {
      const posts = await Posts.find().lean();
      res.status(200).json(posts);
  } catch (error) {
      res.status(500).json({ message: `Server Error: \n ${error}` });
  }
};

module.exports = { getPosts };