const Posts = require('../../models/Posts');

const getRecentPosts = async (req, res) => {
  try {
      const { limit = 8, excludeFeatured = false } = req.query;
      let postsQuery = Posts.find().sort({ createdAt: -1 }).limit(parseInt(limit)).lean();

      if (excludeFeatured === 'true') {
          const featuredPost = await Posts.findOne({ featured: true }).lean();
          if (featuredPost) {
              postsQuery = postsQuery.where('_id').ne(featuredPost._id); 
          }
      }

      const posts = await postsQuery;
      res.status(200).json(posts);
  } catch (error) {
      res.status(500).json({ message: `Server Error: \n ${error}` });
  }
};

module.exports = { getRecentPosts }