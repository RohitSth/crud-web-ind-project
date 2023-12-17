const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_crud', 'postgres', 'rstha876', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
    