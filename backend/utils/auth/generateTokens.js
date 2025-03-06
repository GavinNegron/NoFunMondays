const jwt = require('jsonwebtoken'); 
const UserRefreshToken = require('../../models/UserRefreshToken');

const generateTokens = async (user, generateRefreshToken = true) => {
    try {
        const payload = { _id: user._id, roles: user.roles };

        // Access token expires in 5 minutes
        const accessTokenExp = Math.floor(Date.now() / 1000) + (5 * 60);
        const accessToken = jwt.sign(
            { ...payload, exp: accessTokenExp },
            process.env.JWT_ACCESS_TOKEN_SECRET_KEY
        );

        let refreshToken, refreshTokenExp;

        if (generateRefreshToken) {
            // Refresh token expires in 5 days
            refreshTokenExp = Math.floor(Date.now() / 1000) + (60 * 60);
            refreshToken = jwt.sign(
                { ...payload, exp: refreshTokenExp },
                process.env.JWT_REFRESH_TOKEN_SECRET_KEY
            );

            // Replace the old refresh token with the new one
            await UserRefreshToken.findOneAndDelete({ userId: user._id });
            await new UserRefreshToken({ 
                userId: user._id, 
                token: refreshToken, 
                expiresAt: new Date(refreshTokenExp * 1000) 
            }).save();
        }

        return { accessToken, accessTokenExp, refreshToken, refreshTokenExp };

    } catch (error) {
        console.error('Error in generateTokens:', error);
        return Promise.reject(error);
    }
}

module.exports = generateTokens;