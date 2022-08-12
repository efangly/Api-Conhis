const Sequelize = require('sequelize')
const conhis = require('../configs/conhisdb')

const Log = conhis.define('Log', {
  LogId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  Action: {
    type: Sequelize.STRING
  },
  Username: {
    type: Sequelize.STRING
  },
  Lastmodified: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.fn("GETDATE")
  }
},{
  tableName: 'H_Logs'
})

module.exports = Log