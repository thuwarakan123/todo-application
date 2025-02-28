const { createUser, loginUser } = require("../services/authService");

const register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ success: true, message: 'User registered successfully', data: user });
  } 
  catch (error) {
    if (error.message === 'Email already exists') {
      return res.status(409).json({ success: false, message: 'The provided email address is already registered.', data: null });
    }

    res.status(500).json({ success: false, message: 'Registration failed', data: null });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const response = await loginUser(email, password);
    res.json({ success: true, message:  "User logged in successfully", data: response });
  } 
  catch (error) {
    if (error.message === 'Invalid email' || error.message === 'Invalid password') {
      return res.status(401).json({ success: false, message: error.message, data: null });
    }

    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = {
  register,
  login
}
