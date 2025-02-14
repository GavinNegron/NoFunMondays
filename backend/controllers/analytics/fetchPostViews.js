const PageView = require('../../models/PageView');

const fetchPostViews = async (req, res) => {
    try {
        const { slug, days } = req.query;

        if (!days) {
            const matchStage = slug ? { postSlug: slug } : {};
            const totalViews = await PageView.countDocuments(matchStage);
            return res.json({ slug: slug || 'all', totalViews });
        }

        const numDays = parseInt(days, 10);
        const dates = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = numDays - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dates.push(date.toISOString().split('T')[0]);
        }

        const matchStage = { createdAt: { $gte: new Date(dates[0]) } };
        if (slug) matchStage.postSlug = slug;

        const views = await PageView.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalViews: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const viewsMap = new Map(views.map(v => [v._id, v.totalViews]));
        const result = dates.map(date => ({
            _id: date,
            totalViews: viewsMap.get(date) || 0
        }));

        res.json({slug: slug || 'all', result});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch views' });
    }
};

module.exports = { fetchPostViews };
