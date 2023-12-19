const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL) {
  // Use the DATABASE_URL provided by Render
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Disable SSL verification
      },
    },
    logging: true, // Enable logging to see database queries in the console
  });
} else {
  // Use local development configuration
  sequelize = new Sequelize('node_crud', 'postgres', 'rstha876', {
    host: 'localhost',
    dialect: 'postgres',
    logging: true, // Enable logging for local development as well
  });
}

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
