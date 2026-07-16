const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.dbname, process.env.dbusername, process.env.dbpassword, {
    host: process.env.dbhost,
    port: process.env.dbport,
    dialect: process.env.dialect,
    timezone:"+08:00",
    omitNull: true
  });


module.exports = sequelize;
