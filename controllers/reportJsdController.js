const jsd = require('../configs/jsddb')
const { createtext } = require("./logController")

exports.jsdstock = async (req,res)=>{
  let query = "SELECT * FROM W_Stock "
    query += "ORDER BY vc_UnUsedDivision DESC,ln_CassetteNo ASC"
  await jsd.query(query)
    .then((stock) => {
      res.json(stock[0])
    })
    .catch((err) => {
      createtext(`jsdstock => ${err}`)
      res.json({error: err})
    })
}

exports.jsdstockwithparams = async (req,res)=>{
  const { cassette,drugname } = req.params
  let query = "SELECT * FROM W_Stock WHERE ln_CassetteNo IS NOT NULL "
    if(cassette != 0){
      query +="AND ln_CassetteNo = " + cassette + " "
    }
    if(drugname != 0){
      query += "AND vc_DrugNm LIKE '%" + drugname + "%' "
    }
    query += "ORDER BY vc_UnUsedDivision DESC,ln_CassetteNo ASC"
  console.log(query)
  await jsd.query(query)
    .then((stock) => {
      res.json(stock[0])
    })
    .catch((err) => {
      createtext(`jsdstockwithparams => ${err}`)
      res.json({error: err})
    })
}

exports.jsdminstock = async (req,res)=>{
  let query = "SELECT * FROM W_MinStock "
    query += "ORDER BY vc_UnUsedDivision DESC,ln_CassetteNo ASC"
  await jsd.query(query)
    .then((stock) => {
      res.json(stock[0])
    })
    .catch((err) => {
      createtext(`jsdminstock => ${err}`)
      res.json({error: err})
    })
}

exports.jsdminstockwithparams = async (req,res)=>{
  const { cassette,drugname } = req.params
  let query = "SELECT * FROM W_MinStock WHERE ln_CassetteNo IS NOT NULL "
    if(cassette != 0){
      query +="AND ln_CassetteNo = " + cassette + " "
    }
    if(drugname != 0){
      query += "AND vc_DrugNm LIKE '%" + drugname + "%' "
    }
    query += "ORDER BY vc_UnUsedDivision DESC,ln_CassetteNo ASC"
  await jsd.query(query)
    .then((stock) => {
      res.json(stock[0])
    })
    .catch((err) => {
      createtext(`jsdminstockwithparams => ${err}`)
      res.json({error: err})
    })
}

exports.jsdusedrug = async (req,res)=>{
  const { date,cassette,drugname } = req.params
  let datetime = date.split(",")
  let query = "SELECT c.ln_CassetteNo,b.vc_HostCd1,a.vc_DrugNm,SUM(a.lf_Amount1) AS total FROM H_UseAmount a "
    query += "INNER JOIN M_Drug b ON a.vc_DrugCd = b.vc_DrugCd "
    query += "INNER JOIN M_Cassette c ON b.vc_DrugCd = c.vc_DrugCd  WHERE LEN(a.vc_DrugCd) = 3 "
    if(date != 0){
      query += "AND CONVERT(VARCHAR(10),a.dt_PrepareDate,120) BETWEEN '"+ datetime[0] +"' AND '" + datetime[1] + "' "
    }
    if(cassette != 0){
      query +="AND c.ln_CassetteNo = '" + cassette + "' "
    }
    if(drugname != 0){
      query += "AND a.vc_DrugNm LIKE '%" + drugname + "%' "
    }
    query += "GROUP BY c.ln_CassetteNo,a.vc_DrugNm,b.vc_HostCd1 ORDER BY c.ln_CassetteNo"
  await jsd.query(query)
    .then((drug) => {
      res.json(drug[0])
    })
    .catch((err) => {
      createtext(`jsdusedrug => ${err}`)
      res.json({error: err})
    })
}

exports.jsdpatientusedrug = async (req,res)=>{
  const { hn,drugname,ward,date } = req.params
  let datetime = date.split(",")
  let query = "SELECT ln_CassetteNo,DrugCd,DrugName,FORMAT(SUM(DispensedDose),'####.00') AS DispensedDose,"
  query += "WardCd,WardName,CONVERT(VARCHAR,UpDateRecTime,103) AS DateOrder,UpDateRecTime,UpDateRecTime2,PatientName FROM W_Patientusedrug "
  query += "WHERE PatientName <> 'PREPACK' "
  if(hn != 0){
    query += "AND PatientName LIKE '" + hn + "') "
  }
  if(drugname != 0){
    query += "AND DrugName LIKE '%" + drugname + "%' "
  }
  if(ward != 0){
    query += "AND WardCd ='" + ward + "' "
  }
  if(date != 0){
    query += "AND CONVERT(VARCHAR(10),UpDateRecTime,120) BETWEEN '"+ datetime[0] +"' AND '" + datetime[1] + "' "
  }
  query += "GROUP BY ln_CassetteNo,DrugCd,DrugName,UpDateRecTime,UpDateRecTime2,WardCd,WardName,PatientName "
  query += "ORDER BY WardCd,PatientName,UpDateRecTime,UpDateRecTime2 ASC"
  await jsd.query(query)
    .then((drug) => {
      res.json(drug[0])
    })
    .catch((err) => {
      createtext(`jsdpatientusedrug => ${err}`)
      res.json({error: err})
    })
}