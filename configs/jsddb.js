const Sequelize = require('sequelize')
require("dotenv").config()

const jsd =  new Sequelize(process.env.JSD_DB,process.env.JSD_USER,process.env.JSD_PASSWORD, {
  host: process.env.JSD_HOST,
  dialect: 'mssql',
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    encrypt: true
  },
  define: {
    timestamps: false
  }
});

module.exports = jsd