const User = require("../../models/User");
const UserRefreshToken = require("../../models/UserRefreshToken");
const generateTokens = require("./generateTokens");
const { verifyRefreshToken } = require("./verifyRefreshToken");

const refreshAccessToken = async (req, res) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken);

        if (error) return res.status(401).send({ status: "Failed", message: "Invalid refresh token" });

        const user = await User.findById(tokenDetails._id);

        if (!user) return res.status(404).send({ status: "Failed", message: "User not found" })

        const userRefreshToken = await UserRefreshToken.findOne({ userId: tokenDetails._id });

        if (oldRefreshToken !== userRefreshToken.token || userRefreshToken.blacklisted) return res.status(401).send({ status: "Failed", message: "Unauthorized access"});

        const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);

        return {
            newAccessToken: accessToken,
            newRefreshToken: refreshToken,
            newAccessTokenExp: accessTokenExp,
            newRefreshTokenExp: refreshTokenExp
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Failed", message: "Internal Server Error", error });
        throw Error
    }
}

module.exports = { refreshAccessToken }