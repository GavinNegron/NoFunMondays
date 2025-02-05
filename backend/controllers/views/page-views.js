const { google } = require('googleapis');

const pageViews = async (req, res) => {
  const startDate = req.query.startDate || '2020-01-01';
  const slug = req.query.slug;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsDataClient = google.analyticsdata({
      version: 'v1beta',
      auth,
    });

    const response = await analyticsDataClient.properties.runReport({
      property: `properties/${process.env.GOOGLE_ANALYTICS_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate, endDate: 'today' }],
        metrics: [{ name: 'screenPageViews' }],
        dimensions: [{ name: 'pagePath' }],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: {
              matchType: 'EXACT',
              value: slug,
            },
          },
        },
      },
    });

    const pageViews =
      response.data.rows?.[0]?.metricValues?.[0]?.value || '0';

    return res.status(200).json({ pageViews });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { pageViews };
