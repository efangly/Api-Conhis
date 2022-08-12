const { Op } = require("sequelize")
const Prescription = require('../models/Prescription')
const Ward = require("../models/Ward")
const Conhis = require("../configs/conhisdb")
const { createlog,createtext } = require("./logController")

exports.prescriptionlist = async (req,res)=>{
  const WardCd = req.params.wardcd
  const PriorityCd = req.params.priority
  let query = "SELECT PrescriptionNoHIS,PatientId,PatientName,BedNo,WardCd,"
    query += "CASE WHEN Robot IS NULL THEN CONCAT('0','+',CONVERT(VARCHAR, DTA)) "
    query += "WHEN DTA IS NULL THEN CONVERT(VARCHAR, Robot) "
    query += "ELSE CONCAT(CONVERT(VARCHAR, Robot),'+',CONVERT(VARCHAR, DTA)) "
    query += "END AS Counted FROM W_PrescriptionList "
    query += "WHERE WardCd = '"+WardCd+"' "
    if(PriorityCd != 'all'){
      query += "AND PriorityCd = '"+PriorityCd+"' "
    }
    query += "ORDER BY PrescriptionNoHIS,PatientId"
  await Conhis.query(query)
    .then((prescription) => {
      res.json(prescription[0])
    })
    .catch((err) => {
      createtext(`prescriptionlist => ${err}`)
      res.json({error: err})
    })
}

exports.renewprescriptionlist = async (req,res)=>{
  const WardCd = req.params.wardcd
  let query = "SELECT PrescriptionNoHIS,PriorityCd,PatientId,PatientName,BedNo,WardCd,ProcFlg,"
    query += "CASE WHEN ProcFlg = 1 THEN 'จัดยาแล้ว' ELSE 'ยกเลิก' END AS activestatus FROM M_Prescription "
    query += "WHERE WardCd = '"+WardCd+"' AND ProcFlg IN (1,2) AND ProcessFlg = 1 "
    query += "GROUP BY PrescriptionNoHIS,PriorityCd,PatientId,PatientName,BedNo,WardCd,ProcFlg "
    query += "ORDER BY PrescriptionNoHIS,PatientId"
  await Conhis.query(query)
    .then((prescription) => {
      res.json(prescription[0])
    })
    .catch((err) => {
      createtext(`renewprescriptionlist => ${err}`)
      res.json({error: err})
    })
}

exports.prescriptiondetail = async (req,res)=>{
  const PrescriptionNo = req.params.prescriptionno
  let query = "SELECT PrescriptionNo,DrugCd,DrugName,DispensedDose,"
    query += "CASE WHEN CONVERT(VARCHAR(10),TakeDate,120) = CONVERT(VARCHAR(10),GETDATE(),120) AND SUBSTRING(TakeTime, 3, 2) = '00' THEN CONCAT(Freq_Desc_Detail,' [ยาใช้วันนี้]' ) "
    query += "WHEN CONVERT(VARCHAR(10),TakeDate,120) = CONVERT(VARCHAR(10),DATEADD(day, +1,GETDATE()),120) AND SUBSTRING(TakeTime, 3, 2) = '00' THEN CONCAT(Freq_Desc_Detail,' [ยาใช้พรุ่งนี้]' ) "
    query += "WHEN SUBSTRING(TakeTime, 3, 2) <> '00' THEN CONCAT(Freq_Desc_Detail,'[PRN]' ) "
    query += "ELSE CONCAT(Freq_Desc_Detail,'' ) END AS Freq_Desc_Detail,"
    query += "CASE WHEN DTAFlg = 0 THEN 'Robot' ELSE 'DTA' END AS DTAType,ProcFlg "
    query += "FROM M_Prescription WHERE PrescriptionNoHIS = '"+PrescriptionNo+"' "
    query += "AND ProcFlg IN (0,2) AND ProcessFlg = 1 "
    query += "ORDER BY TakeDate,TakeTime,DrugName"
  await Conhis.query(query)
    .then((prescription) => {
      res.json(prescription[0])
    })
    .catch((err) => {
      createtext(`prescriptiondetail => ${err}`)
      res.json({error: err})
    })
}

exports.prescriptionlistbyid = async (req,res)=>{
  const filtervalue = req.params.filtervalue
  const filterstatus = req.params.filterstatus
  let wherecondition = ""
  switch(filterstatus){
    case 'PRESNO':
      wherecondition = { PrescriptionNo:filtervalue }
      break
    case 'PRESNOHIS':
      wherecondition = { PrescriptionNoHIS:filtervalue }
      break
    case 'HN':
      wherecondition = { PatientId:filtervalue }
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
    createtext(`prescriptionlistbyid => ${err}`)
    res.json({error: err})
  })
}

exports.wardlist = async (req,res)=>{
  await Ward.findAll({
    order: [ ['f_wardseq', 'ASC'] ]
  })
  .then((ward) => {
    res.json(ward)
  })
  .catch((err) => {
    createtext(`wardlist => ${err}`)
    res.json({error: err})
  })
}

exports.wardlistbyward = async (req,res)=>{
  const ward = req.params.ward
  let wherecondition = ""
  if(ward==0){
    wherecondition = { f_wardcode: { [Op.not]: null } }
  }else{
    wherecondition = { f_warddesc: { [Op.substring]: ward} }
  }
  await Ward.findAll({
    where: wherecondition,
    order: [ ['f_wardseq', 'ASC'] ]
  })
  .then((ward) => {
    res.json(ward)
  })
  .catch((err) => {
    createtext(`wardlistbyward => ${err}`)
    res.json({error: err})
  })
}

exports.wardlistbypriority = async (req,res)=>{
  const PriorityCd = req.params.priority
  let query = "SELECT f_wardcode,f_warddesc,f_wardseq,COUNT(PrescriptionNoHIS) AS countward FROM ("
    query += "SELECT b.f_wardcode,b.f_warddesc,b.f_wardseq,a.PrescriptionNoHIS,a.PriorityCd FROM M_Prescription a "
    query += "INNER JOIN M_Ward b ON a.WardCd = b.f_wardcode "
    query += "WHERE ProcessFlg = 1 "
    switch(PriorityCd){
      case 'all':
        query += "AND a.ProcFlg = 0 "
        break;
      case 'renew':
        query += "AND a.ProcFlg IN (1,2) "
        break;
      default:
        query += "AND a.ProcFlg = 0 AND a.PriorityCd = '"+PriorityCd+"' "
    }
    query += "GROUP BY a.PrescriptionNoHIS,b.f_wardseq,b.f_wardcode,b.f_warddesc,a.PriorityCd) AS wardlist "
    query += "GROUP BY f_wardcode,f_warddesc,f_wardseq ORDER BY f_wardseq ASC"
  await Conhis.query(query)
    .then((ward) => {
      res.json(ward[0])
    })
    .catch((err) => {
      createtext(`wardlistbypriority => ${err}`)
      res.json({error: err})
    })
}

exports.countward = async (req,res)=>{
  let query = "SELECT (SELECT COUNT(PrescriptionNoHIS) FROM W_WardList WHERE ProcFlg = 0 AND PriorityCd = 'C') AS conward,"
    query += "(SELECT COUNT(PrescriptionNoHIS) FROM W_WardList WHERE ProcFlg = 0 AND PriorityCd = 'N') AS newward,"
    query += "(SELECT COUNT(PrescriptionNoHIS) FROM W_WardList WHERE ProcFlg IN (1,2)) AS renew,"
    query += "(SELECT COUNT(PrescriptionNoHIS) FROM W_WardList WHERE ProcFlg = 0) AS allward FROM W_WardList"
  await Conhis.query(query)
    .then((ward) => {
      if(ward[0].length === 0){
        res.json([{conward: 0,newward: 0,renew: 0,allward: 0}])
      }else{
        res.json(ward[0])
      }
    })
    .catch((err) => {
      createtext(`countward => ${err}`)
      res.json({error: err})
    })
}

exports.updateward = async (req,res)=>{
  const { wardseqold,wardseqnew} = req.params
  const { wardname } = req.body
  await Ward.update(
    { f_wardseq:wardseqold},
    { where: { f_wardseq:wardseqnew } }
  ).then( async (result) => {
    await Ward.update(
      { f_wardseq:wardseqnew},
      { where: { f_warddesc:wardname } }
    ).then((ward) => {
        res.json({ message:"Update Complete" })
    })
    .catch(err => res.json('error', {error: err}))
  })
  .catch((err) => {
    createtext(`updateward => ${err}`)
    res.json({error: err})
  })
}

exports.cancelPres = async (req,res)=>{
  const { prestype, } = req.params
  const { PrescriptionNo,PrescriptionNoHis,Name } = req.body
  let wherecondition
  let ProcFlgStatus
  switch(prestype){
    case 'pres':
      wherecondition = { PrescriptionNoHIS: PrescriptionNo }
      ProcFlgStatus = 2
      break
    case 'detailpres':
      wherecondition = { PrescriptionNo: PrescriptionNo }
      ProcFlgStatus = 2
      break
    default:
      wherecondition = { PrescriptionNo: PrescriptionNo }
      ProcFlgStatus = 0
  }
  await Prescription.update(
    { ProcFlg: ProcFlgStatus },
    { where: wherecondition }
  ).then((result) => {
    switch(prestype){
      case 'pres':
        createlog(Name,`Cancel PresNoHis : ${PrescriptionNo}`)
        break
      case 'detailpres':
        createlog(Name,`Cancel PresNo : ${PrescriptionNo} | PresNoHis : ${PrescriptionNoHis}`)
        break
      default:
        createlog(Name,`Recovery PresNo : ${PrescriptionNo} | PresNoHis : ${PrescriptionNoHis}`)
    }
    res.json({ message: 'ยกเลิกรายการสำเร็จ' })
  })
  .catch((err) => {
    createtext(`cancelPres => ${err}`)
    res.json({error: err})
  })
}

exports.recoveryPres = async (req,res)=>{
  const { params } = req.params
  const { Name } = req.body
  const useParams = params.split(",")
  let wherecondition = {[Op.or]: [{ WardCd: useParams },{ PrescriptionNoHIS: useParams }]}
  await Prescription.update(
    { ProcFlg: 0 },
    { where: wherecondition }
  ).then((result) => {
    createlog(Name,"Recovery PresNoHis : "+useParams)
    res.json({ message: 'กู้คืนรายการสำเร็จ' })
  })
  .catch((err) => {
    createtext(`recoveryPres => ${err}`)
    res.json({error: err})
  })
}

exports.totaldose = async (req,res)=>{
  const { ward } = req.params
  let query = "SELECT DrugCd,DrugName,SUM(DispensedDose) AS TotalDose "
    query += "FROM M_Prescription "
    query += "WHERE DTAFlg = '0' AND ProcFlg = '0' AND ProcessFlg = '1' "
    if(ward != "all"){ query += "AND WardCd = '" + ward + "' " }
    query += "GROUP BY DrugCd,DrugName"
  await Conhis.query(query)
    .then( async (total) => { 
      res.json(total[0])
    })
    .catch((err) => {
      createtext(`totaldose => ${err}`)
      res.json({error: err})
    })
}

exports.errormiddle = async (req,res)=>{
  let query = "SELECT f_prescriptionno,f_hn,f_warddesc,f_orderitemname,f_orderqty,"
    query += "f_dosage,f_frequencydesc,CONVERT(VARCHAR,f_lastmodified,120) AS f_lastmodified FROM tb_thaneshosp_middle "
    query += "WHERE f_dispensestatus IN (3,4) AND f_status = 0 "
    query += "ORDER BY f_lastmodified DESC"
  await Conhis.query(query)
    .then( async (total) => { 
      res.json(total[0])
    })
    .catch((err) => {
      createtext(`errormiddle => ${err}`)
      res.json({error: err})
    })
}