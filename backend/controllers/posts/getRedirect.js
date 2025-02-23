const Redirect = require('../../models/Redirects');

const getRedirect = async (req, res) => {
  const { slug } = req.params;

  try {
    // Find if any redirect includes the provided slug
    const redirect = await Redirect.findOne({ redirectSlugs: slug });

    if (redirect) {
      return res.json({ originalSlug: redirect.slug });
    } else {
      return res.status(404).json({ message: 'Redirect not found' });
    }
  } catch (error) {
    console.error('Error fetching redirect:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getRedirect };
