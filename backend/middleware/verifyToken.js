const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const response = await fetch(`${process.env.API_URL}/api/auth/session`, {
            headers: { cookie: req.headers.cookie || '' }
        });

        const session = await response.json();
        if (!session || !session.user) return res.status(401).json({ message: 'Unauthorized' });

        req.user = session.user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = { verifyToken };