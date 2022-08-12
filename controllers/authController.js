const jwt = require("jsonwebtoken")
const User = require("../models/User")
const {expressjwt: expressJWT} = require("express-jwt")
const { createlog } = require("./logController")

exports.login = async (req,res)=>{
  const {username,password} = req.body
  await User.findOne({ where: { vc_UserId: username } })
  .then((user) => {
    if(user.vc_PassWord == password){
      const name = user.vc_UserName
      const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'6h'})
      createlog(name,`${name} | Login`)
      return res.json({token,username,name})
    }
    else{
      return res.status(400).json({errormsg:"รหัสผู้ใช้ไม่ถูกต้อง"})
    }
  })
  .catch(err => res.status(400).json({errormsg: "ชื่อผู้ใช้ไม่ถูกต้อง",error: ""+err}))
}
//check token
exports.requireLogin=expressJWT({
  secret:'test-login@12345',
  algorithms:["HS256"],
  userProperty:"auth"
})