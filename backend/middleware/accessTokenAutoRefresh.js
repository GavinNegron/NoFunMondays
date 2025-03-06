const isTokenExpired = require("../utils/auth/isTokenExpired");
const { refreshAccessToken } = require("../utils/auth/refreshAccessToken");
const setTokenCookies = require("../utils/auth/setTokenCookies");

const accessTokenAutoRefresh = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        // Check if token exists and is valid
        if (accessToken && !isTokenExpired(accessToken)) {
            req.headers['authorization'] = `Bearer ${accessToken}`;
            return next();
        } 
        
        // If token doesn't exist or is expired, try to refresh
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ 
                error: 'Unauthorized', 
                message: 'No refresh token available', 
                tokenStatus: 'missing' 
            });
        }

        try {
            const { newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp } = await refreshAccessToken(req, res);           
            
            setTokenCookies(res, newAccessToken, newAccessTokenExp, newRefreshToken, newRefreshTokenExp);
            req.headers['authorization'] = `Bearer ${newAccessToken}`;
            return next();
        } catch (error) {
            console.error('Token refresh failed:', error);
            return res.status(401).json({ 
                error: 'Unauthorized', 
                message: 'Token refresh failed', 
                tokenStatus: 'invalid' 
            });
        }
    } catch (error) {
        console.error('Error in token refresh middleware:', error.message);
        return res.status(401).json({ 
            error: 'Unauthorized', 
            message: 'Authentication error', 
            error: error.message 
        });
    }
}

module.exports = { accessTokenAutoRefresh };