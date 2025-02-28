const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');

const Task = sequelize.define('Task', {
  id: { 
    type: DataTypes.INTEGER,   
    autoIncrement: true,      
    primaryKey: true 
  },
  user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: User, key: 'id' } 
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  completed: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Task;
