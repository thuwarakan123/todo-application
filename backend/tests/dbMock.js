const { Sequelize, DataTypes } = require('sequelize');

// Fix: Ensure SQLite in-memory database is configured properly
const sequelizeMock = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // In-memory database
  logging: false // Disable logging for cleaner test output
});

// Define the User model
const User = sequelizeMock.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
});

// Define the Task model (Fix: Ensure user_id is required)
const Task = sequelizeMock.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = { sequelizeMock, User, Task };



