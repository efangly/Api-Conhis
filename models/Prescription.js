const Sequelize = require('sequelize')
const conhis = require('../configs/conhisdb')

const Prescription = conhis.define('Prescription', {
  PrescriptionNo: {
    type: Sequelize.STRING
  },
  SeqNo: {
    type: Sequelize.INTEGER
  },
  PrescriptionNoHIS: {
    type: Sequelize.STRING
  },
  PriorityCd: {
    type: Sequelize.STRING
  },
  PatientId: {
    type: Sequelize.STRING
  },
  PatientName: {
    type: Sequelize.STRING
  },
  PatientAn: {
    type: Sequelize.STRING
  },
  Birthday: {
    type: Sequelize.DATE
  },
  WardCd: {
    type: Sequelize.STRING
  },
  WardName: {
    type: Sequelize.STRING
  },
  RoomNo: {
    type: Sequelize.STRING
  },
  BedNo: {
    type: Sequelize.STRING
  },
  PrescriptionDate: {
    type: Sequelize.STRING
  },
  TakeDate: {
    type: Sequelize.DATE
  },
  TakeTime: {
    type: Sequelize.STRING
  },
  BarcodeId: {
    type: Sequelize.STRING
  },
  DrugCd: {
    type: Sequelize.STRING
  },
  DrugName: {
    type: Sequelize.STRING
  },
  DispensedDose: {
    type: Sequelize.DECIMAL
  },
  DispensedTotalDose: {
    type: Sequelize.DECIMAL
  },
  DispensedUnit: {
    type: Sequelize.STRING
  },
  Freq_Counter: {
    type: Sequelize.STRING
  },
  Freq_Desc: {
    type: Sequelize.STRING
  },
  Freq_Desc_Detail_Code: {
    type: Sequelize.STRING
  },
  Freq_Desc_Detail: {
    type: Sequelize.STRING
  },
  MakeRecTime: {
    type: Sequelize.DATE
  },
  UpDateRecTime: {
    type: Sequelize.DATE
  },
  FreePrintItem_Presc1: {
    type: Sequelize.STRING
  },
  FreePrintItem_Presc2: {
    type: Sequelize.STRING
  },
  FreePrintItem_Presc3: {
    type: Sequelize.STRING
  },
  FreePrintItem_Presc4: {
    type: Sequelize.STRING
  },
  FreePrintItem_Presc5: {
    type: Sequelize.STRING
  },
  ProcFlg: {
    type: Sequelize.INTEGER
  },
  DTAFlg: {
    type: Sequelize.INTEGER
  },
  MachineFlg: {
    type: Sequelize.INTEGER
  },
  PrintFlg: {
    type: Sequelize.INTEGER
  },
  SMTFlg: {
    type: Sequelize.INTEGER
  },
  ProcessFlg: {
    type: Sequelize.INTEGER
  },
  PharmacyIPD: {
    type: Sequelize.STRING
  },
  RowID: {
    type: Sequelize.STRING
  },
  CreateDateTime: {
    type: Sequelize.DATE
  },
  FieldUpdate: {
    type: Sequelize.STRING
  },
  PackTime: {
    type: Sequelize.STRING
  },
  UserDispensing: {
    type: Sequelize.STRING
  },
  Prescription: {
    type: Sequelize.STRING
  },
  NormalStatus: {
    type: Sequelize.STRING
  },
  f_status: {
    type: Sequelize.INTEGER
  },
  BarcodeByHIS: {
    type: Sequelize.STRING
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  TabSightBatch: {
    type: Sequelize.STRING
  },
  TabSightStatus: {
    type: Sequelize.STRING
  },
  TabSightImageHigh: {
    type: Sequelize.STRING
  },
  TabSightImageLow: {
    type: Sequelize.STRING
  },
  TabSightImageIdentify: {
    type: Sequelize.STRING
  }
},{
  tableName: 'M_Prescription'
})

module.exports = Prescription