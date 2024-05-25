// const Sequelize = require('sequelize');
// require('dotenv').config();

// const sequelize = process.env.DB_URL ?
//   new Sequelize(process.env.DB_URL) :
//   new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'postgres'
//     }
//   );
// module.exports = sequelize;


const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DATABASE_URL ?
  new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Disable logging; default: console.log
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Render might need this for SSL connections
      }
    }
  }) :
  new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT || 5432,
    }
  );

module.exports = sequelize;



