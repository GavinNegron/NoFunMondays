const User = require('../../models/User')

const register = async (req, res) => {
    const { username, email, password } = req.body

    try {
      const existingUser = await User.findOne({ email })
      if (existingUser) return res.status(400).json({ message: 'Email already exists' })
  
      const user = new User({ username, email, password })
      await user.save()
  
      res.status(201).send('User registered successfully')
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
};

module.exports = { register }