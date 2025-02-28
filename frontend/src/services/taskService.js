import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/task";

// Fetch tasks (completed = true/false)
export const getTasks = async (completed) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}?completed=${completed}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch tasks" };
  }
};

// Add new task
export const addTask = async (taskData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, taskData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to add task" };
  }
};

// Mark task as completed
export const completeTask = async (taskId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(`${API_URL}/${taskId}`, { completed: true }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to complete task" };
  }
};
