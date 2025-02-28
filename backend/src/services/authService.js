const { User } = require('../models');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const createUser = async (userData) => {
  const { username, email, password } = userData;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error('Email already exists');  
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  return { id: user.id, username: user.username, token: generateToken(user) };
};


module.exports = {
  createUser,
  loginUser
}