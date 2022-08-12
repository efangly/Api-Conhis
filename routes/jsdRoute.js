const express = require("express")
const router = express.Router()
const jsdroutes = require("../controllers/jsdController")
const reportjsd = require("../controllers/reportJsdController")
const user = require("../controllers/userController")
const { requireLogin } = require("../controllers/authController")

//jsdpres
router.get('/jsdprescription',requireLogin,jsdroutes.jsdprescriptionlist)
router.get('/jsddruglist/:cassette/:drugname',requireLogin,jsdroutes.jsddruglist)
router.put('/jsddruglist/:cassette',requireLogin,jsdroutes.jsdupdatedruglist)
router.get('/drugnotenough',requireLogin,jsdroutes.drugnotenough)
//reporrJSD
router.get('/jsdusedrug/:date/:cassette/:drugname',requireLogin,reportjsd.jsdusedrug)
router.get('/jsdpatientusedrug/:hn/:drugname/:ward/:date',requireLogin,reportjsd.jsdpatientusedrug)
router.get('/jsdpatientusedrug',requireLogin,reportjsd.jsdpatientusedrug)
router.get('/jsdstock',requireLogin,reportjsd.jsdstock)
router.get('/jsdstock/:cassette/:drugname',requireLogin,reportjsd.jsdstockwithparams)
router.get('/jsdminstock',requireLogin,reportjsd.jsdminstock)
router.get('/jsdminstock/:cassette/:drugname',requireLogin,reportjsd.jsdminstockwithparams)
//user
router.get('/userid/:userid',requireLogin,user.userlist)
router.get('/user/:username',requireLogin,user.userlistbyid)
router.put('/user/:userid',requireLogin,user.updateuser)

module.exports=router