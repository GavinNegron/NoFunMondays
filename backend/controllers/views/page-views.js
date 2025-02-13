const crypto = require('crypto');
const Posts = require('../../models/Posts');
const PageView = require('../../models/PageView');

const hashUser = (ip, userAgent) => {
  return crypto.createHash('sha256').update(ip + userAgent).digest('hex');
};

const pageViews = async (req, res) => {
  const { slug } = req.query;
  const ip = (req.headers['x-forwarded-for'] || req.ip).split(',')[0].trim();
  const userAgent = req.headers['user-agent'] || 'unknown';
  const userHash = hashUser(ip, userAgent);

  if (!slug) {
    return res.status(400).json({ error: 'Missing slug' });
  }

  try {
    const existingView = await PageView.findOne({ postSlug: slug, userId: userHash });
zz
    if (!existingView) {
      await PageView.create({ postSlug: slug, userId: userHash });
      await Posts.updateOne({ slug }, { $inc: { views: 1 } });
    }

    const totalViews = await PageView.countDocuments({ postSlug: slug });

    res.status(200).json({ pageViews: totalViews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { pageViews };
