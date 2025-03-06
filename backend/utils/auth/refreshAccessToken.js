const User = require("../../models/User");
const UserRefreshToken = require("../../models/UserRefreshToken");
const generateTokens = require("./generateTokens");
const { verifyRefreshToken } = require("./verifyRefreshToken");

const refreshAccessToken = async (req, res) => {
    try {
        const oldRefreshToken = req.body.refreshToken
        
        if (!oldRefreshToken) {
            const error = new Error("Refresh token is missing");
            error.status = 401;
            throw error;
        }

        const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken);

        if (error) {
            return res.status(401).json({ 
                status: "Failed", 
                message: "245245 Invalid refresh token" 
            });
        }

        const user = await User.findById(tokenDetails._id);

        if (!user) {
            return res.status(404).json({ 
                status: "Failed", 
                message: "User not found" 
            });
        }

        const userRefreshToken = await UserRefreshToken.findOne({ 
            userId: tokenDetails._id 
        });

        if (!userRefreshToken || oldRefreshToken !== userRefreshToken.token || userRefreshToken.blacklisted) {
            return res.status(401).json({ 
                status: "Failed", 
                message: "Unauthorized access"
            });
        }

        const { accessToken, accessTokenExp } = await generateTokens(user, generateRefreshToken = false);

        return {
            newAccessToken: accessToken,
            newAccessTokenExp: accessTokenExp,
        };

    } catch (error) {
        console.error('Error refreshing access token:', error);
        
        const status = error.status || 500;
        const message = error.message || "Internal Server Error";
        
        if (!res.headersSent) {
            res.status(status).json({ 
                status: "Failed", 
                message: message
            });
        }
        
        throw error;
    }
}


module.exports = { refreshAccessToken }