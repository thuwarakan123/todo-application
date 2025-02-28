const sequelize = require('../../config/database');
const User = require('./user');
const Task = require('./task');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Database sync failed:', error);
  }
};

module.exports = { User, Task, syncDatabase };