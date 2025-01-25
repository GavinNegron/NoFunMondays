const isTokenExpired = require("../utils/auth/isTokenExpired");
const { refreshAccessToken } = require("../utils/auth/refreshAccessToken");
const setTokenCookies = require("../utils/auth/setTokenCookies");

const accessTokenAutoRefresh = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (accessToken || !isTokenExpired(accessToken)) {
            req.headers['authorization'] = `Bearer ${accessToken}`;
        } 
        
        if (!accessToken || isTokenExpired(accessToken)) {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) throw new Error("Refresh token is missing");

            const { newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp } = await refreshAccessToken(req, res)            

            setTokenCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp)
            req.headers['authorization'] = `Bearer ${newAccessToken}`;
        }
        next();
    } catch (error) {
        console.error('Error adding access token to header:', error.message);
        res.status(401).json({ error: 'Unauthorized', message: 'Access token is missing or invalid', error });
    }
}

module.exports = { accessTokenAutoRefresh };