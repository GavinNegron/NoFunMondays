const User = require('../../models/User')
const bcrypt = require('bcrypt') 
const sendVerificationEmail = require('../../utils/email/sendVerificationEmail')

const userRegister = async (req, res) => {
  try {
    const { username, email, password, password_confirmation } = req.body

    if (!username || !email || !password || !password_confirmation) return res.status(400).json({ status: "Failed", message: "All fields are required" })

    if (password !== password_confirmation) return res.status(400).json({ status: "Failed", message: "Passwords don't match!"})

    const emailExists = await User.findOne({ email })
    const usernameExists = await User.findOne({ username })

    if (emailExists) return res.status(400).json({ message: 'Email already exists' })
    if (usernameExists) return res.status(400).json({ message: 'Username already exists' })
    
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({ 
      username: username,
      email: email, 
      password: hashedPassword
    }).save();

    sendVerificationEmail(req, newUser);

    res.status(201).json({ 
      status: "Success",
      message: "User successfully created"
    });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

module.exports = { userRegister }