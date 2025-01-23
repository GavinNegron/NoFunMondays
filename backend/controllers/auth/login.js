const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const logger = require('../../utils/logger')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    logger.warn(`Failed login attempt for email: ${email}`)
    return res.status(400).json({ message: 'User not found' })
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    logger.warn(`Failed login attempt for email: ${email}`)
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    'your-secret-key',
    { expiresIn: '1h' }
  )

  logger.info(`User logged in: ${email}`)
  res.json({ token })
};

module.exports = { login }