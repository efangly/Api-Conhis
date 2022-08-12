const express = require("express")
const router = express.Router()
const conhis = require("../controllers/conhisController")
const report = require("../controllers/reportConhisController")
const { requireLogin } = require("../controllers/authController")

//prescription
router.get('/prescription/:wardcd/:priority',requireLogin,conhis.prescriptionlist)
router.get('/prescription/:prescriptionno',requireLogin,conhis.prescriptiondetail)
router.get('/renewprescription/:wardcd',requireLogin,conhis.renewprescriptionlist)
router.get('/errorprescription',requireLogin,conhis.errormiddle)
router.get('/prescriptionfilter/:filterstatus/:filtervalue',requireLogin,conhis.prescriptionlistbyid)
router.get('/prescriptiondta/:filterstatus/:filtervalue',requireLogin,report.prescriptiondtabyid)
router.put('/prescription/:prestype',requireLogin,conhis.cancelPres)
router.put('/recoveryprescription/:params',requireLogin,conhis.recoveryPres)
router.get('/totaldose/:ward',requireLogin,conhis.totaldose)
//ward 
router.get('/wardlist',requireLogin,conhis.wardlist)
router.get('/wardlistbyward/:ward',requireLogin,conhis.wardlistbyward)
router.get('/ward/:priority',requireLogin,conhis.wardlistbypriority)
router.get('/countward',requireLogin,conhis.countward)
router.put('/ward/:wardseqold/:wardseqnew',requireLogin,conhis.updateward)
//report
router.get('/reportdrugdta/:params',requireLogin,report.prescriptiondta)
router.get('/reportwarddta/:params',requireLogin,report.prescriptiondtaward)
router.get('/reportpatientdta/:params',requireLogin,report.prescriptiondtapatient)

module.exports=router