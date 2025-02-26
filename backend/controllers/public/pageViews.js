const UAParser = require('ua-parser-js');
const Posts = require('../../models/Posts');
const PageView = require('../../models/PageView');
const geoip = require('geoip-lite');
const { v4: uuidv4 } = require('uuid');
const { isBot } = require('../../utils/botDetect');

const pageViews = async (req, res) => {
  const { slug } = req.query;
  const ipAddress = (req.headers['x-forwarded-for'] || req.ip).split(',')[0].trim();
  const userAgent = req.headers['user-agent'] || 'unknown';
  const referrer = req.headers['referer'] || 'direct';
  const userId = req.cookies.userId || uuidv4();
  const humanCheck = req.cookies.humanCheck; 
  const refreshToken = req.cookies.refreshToken;
  const accessToken = req.headers.authorization;

  if (refreshToken || accessToken) return res.status(200).json({ message: 'Authenticated user, view not counted' });

  const localhostIps = new Set([
    '127.0.0.1',
    '::1',
    '::ffff:127.0.0.1',
    '::ffff:127.0.0.2',
    '0.0.0.0',
    '::'
  ]);

  if (localhostIps.has(ipAddress) || ipAddress.startsWith('::ffff:127.')) {
    return res.status(200).json({ message: 'Localhost view not counted' });
  }

  res.cookie('userId', userId, { maxAge: 31536000000, httpOnly: true });

  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser().name || 'unknown';

  const geo = geoip.lookup(ipAddress);
  const region = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'unknown';

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';

  if (!slug) return res.status(400).json({ error: 'Missing slug' });

  if (isBot(userAgent) || !humanCheck) return res.status(403).json({ error: 'Bot detected or human verification failed' });

  try {
    const userIdExists = await PageView.findOne({ postSlug: slug, userId });
    const ipExists = await PageView.findOne({ postSlug: slug, ipAddress });
    const existingView = userIdExists || ipExists;

    if (!existingView) {
      await PageView.create({ postSlug: slug, ipAddress, browser, referrer, region, timezone, userId });
      await Posts.updateOne({ slug }, { $inc: { views: 1 } });
    }

    const totalViews = await PageView.countDocuments({ postSlug: slug });

    res.status(200).json({ pageViews: totalViews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { pageViews };
