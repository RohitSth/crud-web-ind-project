// models/record.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Record = sequelize.define('Record', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Record;
