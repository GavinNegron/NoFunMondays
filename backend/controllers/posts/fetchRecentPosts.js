const Posts = require('../../models/Posts');

const getRecentPosts = async (req, res) => {
  try {
      const { limit, type, excludeSlug } = req.query;
      if (!type || !['all', 'recent', 'featured', 'challenge'].includes(type)) {
          return res.status(400).json({ status: "Failed", message: "Invalid or missing type" });
      }

      let query = { status: 'published' };

      if (excludeSlug) {
          query.slug = { $ne: excludeSlug };
      }

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
          case 'challenge':
              query.challenge = { $in: [true, "true"] };
              break;
          case 'all':
              break;
      }

      let queryBuilder = Posts.find(query).sort({ createdAt: -1 });

      if (limit) {
          queryBuilder = queryBuilder.limit(parseInt(limit));
      }

      const posts = await queryBuilder.lean();

      res.status(200).json(posts);
  } catch (error) {
      res.status(500).json({ message: `Server Error: \n ${error}` });
  }
};

module.exports = { getRecentPosts };