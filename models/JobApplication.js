const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobApplication = sequelize.define('JobApplication', {
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
  companyName: { type: DataTypes.STRING, allowNull: false },
  jobTitle: { type: DataTypes.STRING, allowNull: false },
  applicationDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.ENUM('Applied', 'Interviewed', 'Offered', 'Rejected', 'Accepted'), defaultValue: 'Applied' },
  notes: { type: DataTypes.TEXT, allowNull: true },
  attachment: { type: DataTypes.STRING, allowNull: true }, // File URL
}, { timestamps: true });

module.exports = JobApplication;
