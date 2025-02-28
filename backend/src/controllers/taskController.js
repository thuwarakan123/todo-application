const { createTask, getTasks, updateTask } = require("../services/taskService")

const createTaskData = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await createTask(req.user.id, title, description);
    res.status(201).json({success: true, message: 'Task created successfully.', data: task});
  } 
  catch (error) {
    res.status(500).json({success: false, message: 'Failed to create task.', data:null});
  }
};

const getTasksData = async (req, res) => {
  try {
    const { completed } = req.query;

    const tasks = await getTasks(req.user.id, completed)
    res.status(200).json({success: true, message: 'Task retrieved successfully.', data: tasks});
  } 
  catch (error) {
    res.status(500).json({success: false, message: 'Failed to retrieve tasks.', data:null});
  }
};

const updateTaskData = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const task = await updateTask(id, completed, req.user.id);
    res.status(200).json({success: true, message: 'Task updated successfully.', data: task});
  } 
  catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ success: false, message: 'Task not found.', data: null });
    }
    res.status(500).json({ message: 'Failed to update task' });
  }
};

module.exports = { 
  createTaskData,
  getTasksData,
  updateTaskData
}
