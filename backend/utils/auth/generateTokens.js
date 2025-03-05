const jwt = require('jsonwebtoken'); 
const UserRefreshToken = require('../../models/UserRefreshToken');

const generateTokens = async (user) => {
    try {
        const payload = { _id: user._id, roles: user.roles };

        const accessTokenExp = Math.floor(Date.now() / 1000) + (1 * 10);
        const accessToken = jwt.sign(
            { ...payload, exp: accessTokenExp},
            process.env.JWT_ACCESS_TOKEN_SECRET_KEY
        )

        const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5;

        const refreshToken = jwt.sign(
            { ...payload, exp: refreshTokenExp },
            process.env.JWT_REFRESH_TOKEN_SECRET_KEY
        )

        await UserRefreshToken.findOneAndDelete({ userId: user._id })

        await new UserRefreshToken({ userId: user._id, token: refreshToken }).save();

        return Promise.resolve({ accessToken, refreshToken, accessTokenExp, refreshTokenExp });

    } catch (error) {
        console.error('Error in generateTokens:', error);
        return Promise.reject(error)
    }
}

module.exports = generateTokens;