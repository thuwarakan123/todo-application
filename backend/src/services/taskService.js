const { Task } = require('../models');

const createTask = async (id, title, description) => {
    return await Task.create({ user_id: id, title, description });
};

const getTasks = async (id, completed) => {
    const whereCondition = { user_id: id };
    if (completed !== undefined) whereCondition.completed = completed === 'true';
  
    const tasks = await Task.findAll({
        where: whereCondition,
        order: [['created_at', 'DESC']],
        limit: completed === undefined ? 5 : null,
    });
    return tasks;
};

const updateTask = async (id, completed, userId) => {
    const task = await Task.findOne({ where: { id, user_id: userId } });
    if (!task) throw new Error('Task not found');
  
    task.completed = completed;
    await task.save();
    return task;
  };

module.exports = { 
    createTask,
    getTasks,
    updateTask
}

