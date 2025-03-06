const { refreshAccessToken } = require("../../utils/auth/refreshAccessToken");
const setTokenCookies = require("../../utils/auth/setTokenCookies");

const refreshToken = async (req, res) => {
  try {
    // Get the refresh token from the request body
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ 
        status: "Failed", 
        message: "1343 No refresh token provided" 
      });
    }

    const { newAccessToken, newAccessTokenExp } = await refreshAccessToken(req, res);

    setTokenCookies(res, newAccessToken, newAccessTokenExp);

    return res.status(200).json({
      status: "success",
      message: "New tokens generated",
      access_token: newAccessToken,
      access_token_exp: newAccessTokenExp,
    });
    
  } catch (error) {
    console.error('Refresh token error:', error);
    
    // If the error is already handled with a status code
    if (res.headersSent) {
      return;
    }
    
    return res.status(401).json({ 
      status: "Failed", 
      message: "Unable to refresh token" 
    });
  }
};

module.exports = { refreshToken }
