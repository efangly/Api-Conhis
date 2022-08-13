//logController
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const Log = require('../models/Log')

exports.createlog = async (user,message)=>{
  let logid = "log-" + uuidv4()
  await Log.create({ LogId: logid, Action: message, Username: user })
  .then((log) => {
    console.log("Create Log Success!!")
    return true
  })
  .catch((err) => { 
    console.log("Create Log Fail => "+err)
    return false
  })
}

exports.createtext = async (message)=>{
  let date = new Date()
  const getdate = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`
  const getdatetime = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  fs.appendFile(`./logs/Log_${getdate}.txt`, `${getdatetime} : ${message}\n`, function(err, file){
    if (err) throw err
    console.log('Text Saved!!')
  })
}
