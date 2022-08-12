const Sequelize = require('sequelize')
const conhis = require('../configs/conhisdb')

const Ward = conhis.define('Ward', {
  f_wardcode: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  f_warddesc: {
    type: Sequelize.STRING
  },
  f_wardseq: {
    type: Sequelize.INTEGER
  },
  f_lastmodified: {
    type: Sequelize.DATE
  }
},{
  tableName: 'M_Ward'
})

module.exports = Ward