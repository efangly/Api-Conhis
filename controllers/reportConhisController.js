const Sequelize = require('sequelize')
const Prescription = require('../models/Prescription')
const { createtext } = require("./logController")

exports.prescriptiondta = async (req,res)=>{
  const { params } = req.params
  const useParams = params.split(",")
  await Prescription.findAll({
    attributes: [
      'DrugName','DispensedDose',
      [Sequelize.fn('COUNT',Sequelize.col('DispensedDose')),'SetCount'],
      [Sequelize.fn('SUM',Sequelize.col('DispensedDose')),'TotalDose'] ],
    where: {
      DTAFlg: 1,ProcessFlg: 1,ProcFlg: 0,
      [Sequelize.Op.or]: [{ WardCd: useParams },{ PrescriptionNoHIS: useParams }]
    },
    group : ['DrugName','DispensedDose'],
    order: [
      ['DrugName', 'ASC'],
      ['DispensedDose', 'ASC']
    ]
  })
  .then(prescription => res.json(prescription))
  .catch((err) => {
    createtext(`prescriptiondta => ${err}`)
    res.json({error: err})
  })
}

exports.prescriptiondtaward = async (req,res)=>{
  const { params } = req.params
  const useParams = params.split(",")
  await Prescription.findAll({
    attributes: [
      'DrugName','DispensedDose','WardCd','WardName',
      [Sequelize.fn('COUNT',Sequelize.col('DispensedDose')),'SetCount'],
      [Sequelize.fn('SUM',Sequelize.col('DispensedDose')),'TotalDose'] ],
    where: {
      DTAFlg: 1,ProcessFlg: 1,ProcFlg: 0,
      [Sequelize.Op.or]: [{ WardCd: useParams },{ PrescriptionNoHIS: useParams }]
    },
    group : ['WardCd','WardName','DrugName','DispensedDose'],
    order: [
      ['WardCd', 'ASC'],
      ['DrugName', 'ASC'],
      ['DispensedDose', 'ASC']
    ]
  })
  .then(prescription => res.json(prescription))
  .catch((err) => {
    createtext(`prescriptiondtaward => ${err}`)
    res.json({error: err})
  })
}

exports.prescriptiondtapatient = async (req,res)=>{
  const { params } = req.params
  const useParams = params.split(",")
  await Prescription.findAll({
    attributes: [
      'DrugName','DispensedDose','WardCd','PatientId','PatientName',
      [Sequelize.fn('COUNT',Sequelize.col('DispensedDose')),'SetCount'],
      [Sequelize.fn('SUM',Sequelize.col('DispensedDose')),'TotalDose'] ],
    where: {
      DTAFlg: 1,ProcessFlg: 1,ProcFlg: 0,
      [Sequelize.Op.or]: [{ WardCd: useParams },{ PrescriptionNoHIS: useParams }]
    },
    group : ['WardCd','PatientId','PatientName','DrugName','DispensedDose'],
    order: [
      ['WardCd', 'ASC'],
      ['PatientId', 'ASC'],
      ['DrugName', 'ASC'],
      ['DispensedDose', 'ASC']
    ]
  })
  .then(prescription => res.json(prescription))
  .catch((err) => {
    createtext(`prescriptiondtapatient => ${err}`)
    res.json({error: err})
  })
}

exports.prescriptiondtabyid = async (req,res)=>{
  const filtervalue = req.params.filtervalue
  const filterstatus = req.params.filterstatus
  let wherecondition = ""
  switch(filterstatus){
    case 'WARD':
      wherecondition = { DTAFlg:1,WardCd:filtervalue }
      break
    case 'HN':
      wherecondition = { DTAFlg:1,PatientId:filtervalue }
      break
  }
  await Prescription.findAll({
    where: wherecondition,
    order: [
      ['WardCd', 'ASC'],
      ['PrescriptionNoHIS', 'ASC'],
      ['TakeDate', 'ASC'],
      ['TakeTime', 'ASC']
    ]
  })
  .then(prescription => res.json(prescription))
  .catch((err) => {
    createtext(`prescriptiondtabyid => ${err}`)
    res.json({error: err})
  })
}