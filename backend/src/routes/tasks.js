const express = require('express');
const { createTaskData, getTasksData, updateTaskData } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateTaskCreation, validateTaskUpdate } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/', authMiddleware, validateTaskCreation, createTaskData);
router.get('/', authMiddleware, getTasksData);
router.patch('/:id', authMiddleware, validateTaskUpdate, updateTaskData);

module.exports = router;
