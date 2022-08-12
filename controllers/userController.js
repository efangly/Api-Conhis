//userController
const { Op } = require("sequelize")
const User = require('../models/User')
const { createtext } = require("./logController")

exports.userlist = async (req,res)=>{
  const userid = req.params.userid
  await User.findOne({
    where: { vc_UserId: userid},
    order: [
      ['vc_AdmLevel', 'DESC'],
      ['vc_UserName', 'ASC']
    ]
  })
  .then((user) => {
    res.json(user)
  })
  .catch((err) => {
    createtext(`userlist => ${err}`)
    res.json({error: err})
  })
}

exports.userlistbyid = async (req,res)=>{
  const username = req.params.username
  let wherecondition
  if(username == 0){
    wherecondition = { vc_UserName: {[Op.notIn]: ['admin','Develop','user','user1','Yuyama']} }
  }else{
    wherecondition = { [Op.and]: [ {vc_UserName: {[Op.substring]: username}},{vc_UserName: {[Op.notIn]: ['admin','Develop','user','user1','Yuyama']}} ] }
  }
  await User.findAll({
    where: wherecondition,
    order: [
      ['vc_AdmLevel', 'DESC'],
      ['vc_UserName', 'ASC']
    ]
  })
  .then(user => res.json(user))
  .catch((err) => {
    createtext(`userlistbyid => ${err}`)
    res.json({error: err})
  })
}

exports.updateuser = async (req,res)=>{
  const userid = req.params.userid
  const {vc_UserId,vc_UserName,vc_PassWord,vc_AdmLevel,dt_LastUpdateDate} = req.body
  await User.update({vc_UserId:vc_UserId,vc_UserName:vc_UserName,vc_PassWord:vc_PassWord,vc_AdmLevel:vc_AdmLevel,dt_LastUpdateDate:dt_LastUpdateDate},{
    where:{ vc_UserId:userid }
  })
  .then((user) => {
    res.json({"message":"อัพเดทข้อมูลเรียบร้อย"})
  })
  .catch((err) => {
    createtext(`updateuser => ${err}`)
    res.json({error: err})
  })
}