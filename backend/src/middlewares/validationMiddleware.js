const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .bail()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .bail()
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .bail()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map(err => err.msg).join(', ');
      return res.status(400).json({ success: false, message: errorMessage, data:null});
    }
    next();
  }
];

const validateLogin = [ 
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .bail()
      .isEmail().withMessage('Invalid email format'),
  
    body('password')
      .notEmpty().withMessage('Password is required')
      .bail()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map(err => err.msg).join(', ');
        return res.status(400).json({ success: false, message: errorMessage, data:null });
      }
      next();
    }
];

const validateTaskCreation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .bail()
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .bail()
    .isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map(err => err.msg).join(', ');
      return res.status(400).json({ success: false, message: errorMessage, data:null });
    }
    next();
  }
];

const validateTaskUpdate = [
  body('completed')
    .notEmpty().withMessage('Completed status is required')
    .bail()
    .isBoolean().withMessage('Completed must be a boolean value'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map(err => err.msg).join(', ');
      return res.status(400).json({ success: false, message: errorMessage, data:null });
    }
    next();
  }
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateTaskCreation,
  validateTaskUpdate
}
