const Posts = require('../../models/Posts');

const fetchSlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Posts.findOne({ slug }).lean();

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error: \n ${error}` });
  }
};

module.exports = { fetchSlug };