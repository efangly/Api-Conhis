const Sequelize = require('sequelize')
require("dotenv").config()

const conhis =  new Sequelize(process.env.CONHIS_DB,process.env.CONHIS_USER,process.env.CONHIS_PASSWORD, {
  host: process.env.CONHIS_HOST,
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

module.exports = conhis