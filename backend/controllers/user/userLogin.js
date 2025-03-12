const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });
  
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });

  } catch (error) {
    res.status(500).json({ status: "Failed", message: "Unable to login, please try again later", error } );
  }
};

module.exports = { userLogin }