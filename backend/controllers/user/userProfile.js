const userProfile = async (req, res) => {
    try {
        res.send({ "User": req.user })
    } catch (error) {
        res.status(404).json({ status: "Failed", message: error })
    }
};

module.exports = { userProfile }