const Sequelize = require('sequelize')
const jsd = require('../configs/jsddb')

const Cassette = jsd.define('Cassette', {
  ln_CassetteNo: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  vc_DrugCd: {
    type: Sequelize.STRING
  },
  vc_UnUsedDivision: {
    type: Sequelize.STRING
  },
  ln_BaseStock: {
    type: Sequelize.DECIMAL
  },
  ln_ProperStock: {
    type: Sequelize.DECIMAL
  },
  ln_useWeight: {
    type: Sequelize.DECIMAL
  },
  ln_TheoryStock: {
    type: Sequelize.DECIMAL
  },
  ln_CurrentStock: {
    type: Sequelize.DECIMAL
  },
  vc_CasetWeight: {
    type: Sequelize.STRING
  },
  vc_LotNo: {
    type: Sequelize.STRING
  },
  dt_ValidityDate: {
    type: Sequelize.DATE
  },
  vc_FillingUserId: {
    type: Sequelize.STRING
  },
  dt_FillingDate: {
    type: Sequelize.DATE
  },
  dt_LastUpdateDate: {
    type: Sequelize.DATE
  },
  vc_ComputerNm: {
    type: Sequelize.STRING
  },
  vc_UserNm: {
    type: Sequelize.STRING
  },
  vc_ProgramNm: {
    type: Sequelize.STRING
  },
  vc_HalfKubun: {
    type: Sequelize.STRING
  },
  dt_ConsentHalfCassDate: {
    type: Sequelize.DATE
  },
  vc_FillingCheckedUserId: {
    type: Sequelize.STRING
  },
  vc_HeatRemoveUserId: {
    type: Sequelize.STRING
  },
  vc_HeatRemoveCheckedUserId: {
    type: Sequelize.STRING
  },
  dt_HeatRemoveDate: {
    type: Sequelize.DATE
  }
},{
  tableName: 'M_Cassette'
})

module.exports = Cassette