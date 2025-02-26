const Agenda = require('agenda');
const Posts = require('../models/Posts');
const PageView = require('../models/PageView');

const mongoConnectionString = process.env.MONGO_URI;
const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'jobs' } });

agenda.define('track page view', async (job) => {
  const { slug, ipAddress, browser, referrer, region, timezone, userId } = job.attrs.data;

  const existingView = await PageView.findOne({ postSlug: slug, $or: [{ userId }, { ipAddress }] });

  if (!existingView) {
    await PageView.create({ postSlug: slug, ipAddress, browser, referrer, region, timezone, userId });
    await Posts.updateOne({ slug }, { $inc: { views: 1 } });
  }
});

(async function () {
  await agenda.start();
})();

module.exports = agenda;