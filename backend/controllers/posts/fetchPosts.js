const Posts = require('../../models/Posts');

const getPosts = async (req, res) => {
  try {
    const { limit, excludeFeatured } = req.query;
    const query = excludeFeatured === 'true' ? { featured: { $ne: true } } : {};

    const posts = await Posts.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(limit ? parseInt(limit) : 0)
      .lean();
    
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: `Server Error: \n ${error}` });
  }
};

module.exports = { getPosts };