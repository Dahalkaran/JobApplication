const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reminder = sequelize.define('Reminder', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: { // Foreign key to User
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  jobId: { // Foreign key to JobApplication
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'JobApplications',
      key: 'id',
    },
  },
  reminderDate: { type: DataTypes.DATE, allowNull: false },
}, { timestamps: true });

module.exports = Reminder;
