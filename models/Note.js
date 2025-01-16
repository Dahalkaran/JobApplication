const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  jobId: { // Foreign key to JobApplication
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'JobApplications',
      key: 'id',
    },
  },
  content: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: true });

module.exports = Note;
