const Sequelize = require('sequelize')
const jsd = require('../configs/jsddb')

const Jsdprescription = jsd.define('Jsdprescription', {
  PrescriptionNo: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  SeqNo: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Group_No: {
    type: Sequelize.INTEGER
  },
  MachineNo: {
    type: Sequelize.INTEGER
  },
  ProcFlg: {
    type: Sequelize.INTEGER
  },
  PatientId: {
    type: Sequelize.STRING
  },
  PatientName: {
    type: Sequelize.STRING
  },
  EnglishName: {
    type: Sequelize.STRING
  },
  Birthday: {
    type: Sequelize.DATE
  },
  Sex: {
    type: Sequelize.STRING
  },
  IOFlg: {
    type: Sequelize.STRING
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
  DoctorCd: {
    type: Sequelize.STRING
  },
  DoctorName: {
    type: Sequelize.STRING
  },
  PrescriptionDate: {
    type: Sequelize.DATE
  },
  TakeDate: {
    type: Sequelize.DATE
  },
  TakeTime: {
    type: Sequelize.STRING
  },
  LastTime: {
    type: Sequelize.STRING
  },
  Presc_Class: {
    type: Sequelize.INTEGER
  },
  DrugCd: {
    type: Sequelize.STRING
  },
  DrugName: {
    type: Sequelize.STRING
  },
  DrugShape: {
    type: Sequelize.STRING
  },
  PrescriptionDose: {
    type: Sequelize.DECIMAL
  },
  PrescriptionUnit: {
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
  Amount_Per_Package: {
    type: Sequelize.DECIMAL
  },
  Firm_Id: {
    type: Sequelize.STRING
  },
  Dispense_Days: {
    type: Sequelize.INTEGER
  },
  Freq_Desc_Code: {
    type: Sequelize.STRING
  },
  Freq_Desc: {
    type: Sequelize.STRING
  },
  Freq_Counter: {
    type: Sequelize.STRING
  },
  Freq_Desc_Detail_Code: {
    type: Sequelize.STRING
  },
  Freq_Desc_Detail: {
    type: Sequelize.STRING
  },
  Explanation_Code: {
    type: Sequelize.STRING
  },
  Explanation: {
    type: Sequelize.STRING
  },
  Administration_Name: {
    type: Sequelize.STRING
  },
  DoctorComment: {
    type: Sequelize.STRING
  },
  BagOrderby: {
    type: Sequelize.DECIMAL
  },
  MakeRecTime: {
    type: Sequelize.DATE,
    primaryKey: true
  },
  UpDateRecTime: {
    type: Sequelize.DATE
  },
  Filler: {
    type: Sequelize.STRING
  },
  Order_No: {
    type: Sequelize.DECIMAL
  },
  Order_Sub_No: {
    type: Sequelize.DECIMAL
  },
  BagPrintFmt: {
    type: Sequelize.STRING
  },
  BagLen: {
    type: Sequelize.STRING
  },
  BagPrintPatientNm: {
    type: Sequelize.STRING
  },
  TicketNo: {
    type: Sequelize.STRING
  },
  FreePrintItem_Presc1: {
    type: Sequelize.STRING
  },
  FreePrintItem_Presc2: {
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
  FreePrintItem_Drug1: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug2: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug3: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug4: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug5: {
    type: Sequelize.STRING
  },
  SyntheticFlg: {
    type: Sequelize.STRING
  },
  CutFlg: {
    type: Sequelize.STRING
  },
  PharmacyTime: {
    type: Sequelize.STRING
  },
  CarvedSeal: {
    type: Sequelize.STRING
  },
  CarvedSealAbb: {
    type: Sequelize.STRING
  },
  PreBarcode1: {
    type: Sequelize.STRING
  },
  PreBarcode2: {
    type: Sequelize.STRING
  },
  PreDrugBarcode: {
    type: Sequelize.STRING
  },
  PreBarcodeFmt: {
    type: Sequelize.STRING
  },
  HisId: {
    type: Sequelize.STRING
  },
  BoxCntStandard: {
    type: Sequelize.STRING
  },
  DrugBarcode1: {
    type: Sequelize.STRING
  },
  DrugBarcode2: {
    type: Sequelize.STRING
  },
  DrugBarcode3: {
    type: Sequelize.STRING
  },
  DrugBarcode4: {
    type: Sequelize.STRING
  },
  DrugBarcode5: {
    type: Sequelize.STRING
  },
  DrugBarcode6: {
    type: Sequelize.STRING
  },
  DrugBarcode7: {
    type: Sequelize.STRING
  },
  DrugBarcode8: {
    type: Sequelize.STRING
  },
  DrugBarcode9: {
    type: Sequelize.STRING
  },
  DrugBarcode10: {
    type: Sequelize.STRING
  },
  MassPrint1: {
    type: Sequelize.STRING
  },
  MassPrint2: {
    type: Sequelize.STRING
  },
  MassPrint3: {
    type: Sequelize.STRING
  },
  MassPrint4: {
    type: Sequelize.STRING
  },
  MassPrint5: {
    type: Sequelize.STRING
  },
  MassPrint6: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug6: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug7: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug8: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug9: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug10: {
    type: Sequelize.STRING
  },
  InsertMessageFlg: {
    type: Sequelize.STRING
  },
  InsertMessageBagPrintFmt: {
    type: Sequelize.STRING
  },
  InsertMessageBagLen: {
    type: Sequelize.STRING
  },
  InsertMessageTakeDate: {
    type: Sequelize.DATE
  },
  InsertMessage1: {
    type: Sequelize.STRING
  },
  InsertMessage2: {
    type: Sequelize.STRING
  },
  InsertMessage3: {
    type: Sequelize.STRING
  },
  DrugPac: {
    type: Sequelize.STRING
  },
  DrugTouchPanel: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug11: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug12: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug13: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug14: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug15: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug16: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug17: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug18: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug19: {
    type: Sequelize.STRING
  },
  FreePrintItem_Drug20: {
    type: Sequelize.STRING
  }
},{
  tableName: 'Prescription'
})

module.exports = Jsdprescription