const UserRefreshToken = require("../../models/UserRefreshToken");

const userLogout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    await UserRefreshToken.findOneAndUpdate(
        { token: refreshToken },
        { $set: { blacklisted: true } }
    );

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('is_auth');

    res.status(200).json({ status: "Success", message: "Logout Successfull"} )
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Failed", message: "Unable to logout, please try again later" })
    }
};

module.exports = { userLogout }