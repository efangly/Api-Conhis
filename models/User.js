const Sequelize = require('sequelize')
const conhis = require('../configs/jsddb')

const User = conhis.define('User', {
  vc_UserId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  vc_UserName: {
    type: Sequelize.STRING
  },
  vc_PassWord: {
    type: Sequelize.STRING
  },
  vc_AdmLevel: {
    type: Sequelize.STRING
  },
  dt_LastUpdateDate: {
    type: Sequelize.DATE
  }
},{
  tableName: 'M_Users'
})

module.exports = User