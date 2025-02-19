const Posts = require('../../models/Posts');

const getRecentPosts = async (req, res) => {
  try {
      const { limit = 8, type } = req.query;

      if (!type || !['all', 'recent', 'featured'].includes(type)) {
          return res.status(400).json({ status: "Failed", message: "Invalid or missing type" });
      }

      let query = { status: 'published' };

      switch (type) {
          case 'featured':
              query.featured = true;
              break;
          case 'recent':
              const featuredPost = await Posts.findOne({ featured: true, status: 'published' }).lean();
              if (featuredPost) {
                  query._id = { $ne: featuredPost._id };
              }
              break;
          case 'all':
              break;
      }

      const posts = await Posts.find(query).sort({ createdAt: -1 }).limit(parseInt(limit)).lean();


      res.status(200).json(posts);
  } catch (error) {
      res.status(500).json({ message: `Server Error: \n ${error}` });
  }
};

module.exports = { getRecentPosts };
