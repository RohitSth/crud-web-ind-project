const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL) {
  // Use the DATABASE_URL provided by Heroku
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Disable SSL verification
      },
    },
  });
} else {
  // Use local development configuration
  sequelize = new Sequelize('node_crud', 'postgres', 'rstha876', {
    host: 'localhost',
    dialect: 'postgres',
  });
}

module.exports = sequelize;
