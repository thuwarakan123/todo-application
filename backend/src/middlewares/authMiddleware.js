const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  

  if (!token) return res.status(401).json({ success: true, message: 'No token provided', data: null });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ success: true, message: 'Invalid token', data: null });
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
