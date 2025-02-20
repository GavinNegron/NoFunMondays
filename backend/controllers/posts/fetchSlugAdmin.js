const Posts = require('../../models/Posts');
const PostSave = require('../../models/PostSave');

const fetchSlugAdmin = async (req, res) => {
  try {
    const { slug } = req.params;

    const draft = await PostSave.findOne({ slug }).lean();
    if (draft) {
      return res.status(200).json(draft);
    }

    const post = await Posts.findOne({ slug }).lean();
    if (post) {
      return res.status(200).json(post);
    }

    res.status(404).json({ message: 'Post not found' });
  } catch (error) {
    res.status(500).json({ message: `Server Error: \n ${error}` });
  }
};

module.exports = { fetchSlugAdmin };