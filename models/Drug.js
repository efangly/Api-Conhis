const Sequelize = require('sequelize')
const jsd = require('../configs/jsddb')

const Drug = jsd.define('Drug', {
  vc_DrugCd: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  vc_DrugNm: {
    type: Sequelize.STRING
  },
  vc_RfidNo: {
    type: Sequelize.STRING
  },
  vc_JanCd1: {
    type: Sequelize.STRING
  },
  vc_JanCd2: {
    type: Sequelize.STRING
  },
  vc_HostCd1: {
    type: Sequelize.STRING
  }
},{
  tableName: 'M_Drug'
})

module.exports = Drug