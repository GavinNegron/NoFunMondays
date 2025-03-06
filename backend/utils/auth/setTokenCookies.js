const setTokenCookies = (res, accessToken, accessTokenExp, refreshToken = null, refreshTokenExp = null) => {
    // Calculate cookie max age in milliseconds
    const accessTokenMaxAge = (accessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
    const refreshTokenMaxAge = refreshTokenExp ? (refreshTokenExp - Math.floor(Date.now() / 1000)) * 1000 : null;

    // Set environment-specific secure flag
    const isProduction = process.env.NODE_ENV === 'production';

    // Set the access token cookie
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: isProduction, // Only set to true in production
        sameSite: 'Strict',
        maxAge: accessTokenMaxAge,
        path: '/'
    });

    if (refreshToken && refreshTokenExp) {
        // Set the refresh token cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction, // Only set to true in production
            sameSite: 'Strict',
            maxAge: refreshTokenMaxAge,
            path: '/'
        });

        // Set a non-httpOnly cookie for frontend auth state
        res.cookie('is_auth', true, {
            httpOnly: false,
            secure: isProduction, // Only set to true in production
            maxAge: refreshTokenMaxAge,
            sameSite: 'Strict',
            path: '/'
        });
    } else {
        // Set a non-httpOnly cookie for frontend auth state with access token expiry time
        res.cookie('is_auth', true, {
            httpOnly: false,
            secure: isProduction, // Only set to true in production
            maxAge: accessTokenMaxAge,
            sameSite: 'Strict',
            path: '/'
        });
    }
};

module.exports = setTokenCookies;