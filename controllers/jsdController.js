const Jsdprescription = require('../models/Jsdprescription')
const jsd = require('../configs/jsddb')
const { createtext } = require("./logController")

exports.jsdprescriptionlist = async (req,res)=>{
  await Jsdprescription.findAll()
    .then((prescription) => {
      res.json(prescription)
    })
    .catch((err) => {
      createtext(`jsdprescriptionlist => ${err}`)
      res.json({error: err})
    })
}

exports.jsddruglist = async (req,res)=>{
  const { cassette,drugname } = req.params
  let query = "SELECT * FROM W_DrugMaster WHERE vc_DrugCd IS NOT NULL "
    if(cassette != 0){
      query +="AND ln_CassetteNo = '" + cassette + "' "
    }
    if(drugname != 0){
      query += "AND vc_DrugNm LIKE '%" + drugname + "%' "
    }
    query += "ORDER BY ln_CassetteNo ASC"
  await jsd.query(query)
    .then((drug) => {
      res.json(drug[0])
    })
    .catch((err) => {
      createtext(`jsddruglist => ${err}`)
      res.json({error: err})
    })
}
exports.jsdupdatedruglist = async (req,res)=>{
  const { cassette } = req.params
  const { vc_DrugNm,vc_HostCd1,ln_BaseStock,ln_ProperStock,ln_CurrentStock,vc_LotNo,dt_ValidityDate } = req.body
  let query = "UPDATE A "
    query += "SET A.vc_DrugNm = '"+ vc_DrugNm +"',A.vc_HostCd1='"+vc_HostCd1+"' "
    query += "FROM M_Drug A INNER JOIN M_Cassette B "
    query += "ON B.vc_DrugCd = A.vc_DrugCd "
    query += "AND B.ln_CassetteNo = "+cassette+" "
  let query1 = "UPDATE B "
    query1 += "SET B.ln_BaseStock="+ln_BaseStock+",B.ln_ProperStock="+ln_ProperStock+",B.ln_CurrentStock="+ln_CurrentStock
    query1 += ",B.vc_LotNo='"+vc_LotNo+"',B.dt_ValidityDate='"+dt_ValidityDate+"' "
    query1 += "FROM M_Cassette B INNER JOIN M_Drug A "
    query1 += "ON B.vc_DrugCd = A.vc_DrugCd "
    query1 += "AND B.ln_CassetteNo = "+cassette+" "
  await jsd.query(query)
  .then( async (drug) => {
    await jsd.query(query1)
    .then((drug1) => {
      res.json({ message:"Update Complete" })
    })
    .catch(err => res.json('error', {error: err}))
  })
  .catch((err) => {
    createtext(`jsdupdatedruglist => ${err}`)
    res.json({error: err})
  })
}

exports.drugnotenough = async (req,res)=>{
  let query = "SELECT a.vc_HostCd1,a.vc_DrugNm,b.ln_CurrentStock,b.ln_CassetteNo FROM M_Drug a "
    query += "LEFT JOIN M_Cassette b ON a.vc_DrugCd = b.vc_DrugCd "
    query += "WHERE b.vc_UnUsedDivision = '0' "
    query += "ORDER BY vc_DrugNm ASC"
  await jsd.query(query)
    .then((drug) => {
      res.json(drug[0])
    })
    .catch((err) => {
      createtext(`drugnotenough => ${err}`)
      res.json({error: err})
    })
}